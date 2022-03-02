package handlers

import (
	"backend/app/chat"
	"backend/app/models"
	"backend/app/responses"
	"backend/database"
	"backend/utils"
	"context"
	"log"
	"strconv"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

var chatService = chat.NewChatService()

func GetChatRoomHandler(c *gin.Context) {
	chatId, userId, err := chatService.CheckToken(c.Param("token"))
	if err != nil {
		c.JSON(400, gin.H{
			"message": err,
		})
		return
	}
	chatService.ConnectDMRoom(chatId, userId, c.Writer, c.Request)
}
func GetChatTokenHandler(c *gin.Context) {
	otherIdStr := c.Param("otherId")
	chatType := c.Param("chatType")
	otherId, err := strconv.Atoi(otherIdStr)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "OtherId is not valid string",
		})
		return
	}
	isDM := (chatType == "dm")
	userId, _ := strconv.Atoi(c.GetString("user_id"))
	log.Println(userId, otherId, chatType)
	if isDM {
		chatId, err := chatService.GetChatId(userId, otherId)
		if err != nil {
			c.JSON(400, gin.H{
				"message": err,
			})
			return
		}
		token := chatService.CreateToken(chatId, userId)
		c.JSON(200, gin.H{
			"message": "ok",
			"token":   token,
		})

	}
}

func GetChatPartners(c *gin.Context) {
	userId := c.GetString("user_id")
	//log.Println("userId", userId)
	rows, err := database.Sql.Query(`Select D.dmChatId, U.profileName, U.UserId  From DMChat D, User U
	 where (D.UserId1 = ? or D.UserId2 = ?) and ((U.userId = D.UserId1 or U.userId = D.userId2) and U.userId != ?)`, userId, userId, userId)
	if err != nil || rows == nil {
		message := "no chat found"
		if err == nil {
			message = err.Error()
		}
		c.JSON(400, gin.H{
			"message": message,
		})
		return
	}
	resp := responses.ChatPartnersResponse{Partners: []responses.Partner{}}
	defer rows.Close()
	for rows.Next() {
		var dm, partnerId int
		var profileName string
		rows.Scan(&dm, &profileName, &partnerId)
		partner := responses.Partner{DMId: dm, UserId: partnerId, ProfileName: profileName}
		partner.ProfilePicUrl = ""
		partner.LastMessage = ""
		partner.LastMessageId = ""
		iter := database.Firestore.Collection("DM"+strconv.Itoa(dm)).OrderBy("DateTime", firestore.Desc).Limit(1).Documents(context.Background())
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				c.JSON(500, gin.H{
					"message": "Failed to iterate:" + err.Error(),
				})
				return
			}
			partner.LastMessage = doc.Data()["Message"].(string)
			partner.LastMessageId = doc.Ref.ID
		}
		resp.Partners = append(resp.Partners, partner)
	}
	c.JSON(200, resp)

}

func GetDMHistoryHandlers(c *gin.Context) {
	userId, _ := strconv.Atoi(c.GetString("user_id"))

	chatId := c.Param("chatId")
	chatInt, err := strconv.Atoi(chatId)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "chatId must be int",
		})
	}
	if !chatService.DMAuthorityCheck(userId, chatInt) {
		c.JSON(401, gin.H{
			"message": "not in this chat",
		})
		return
	}
	response := responses.ChatHistoryResponse{Messages: []models.Message{}, LastId: ""}
	before := c.Query("before")
	num := 10
	if c.Query("num") != "" {
		num, err = strconv.Atoi(c.Query("num"))
		if err != nil {
			c.JSON(400, gin.H{
				"message": "number must be integer",
			})
			return
		}
	}
	chatName := "DM" + chatId
	query := database.Firestore.Collection(chatName).OrderBy("DateTime", firestore.Desc)
	var iter *firestore.DocumentIterator
	if before != "" {
		begin, err := database.Firestore.Collection(chatName).Doc(before).Get(context.Background())
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}
		iter = query.StartAfter(begin.Data()["DateTime"]).Limit(num).Documents(context.Background())
	} else {
		iter = query.Limit(num).Documents(context.Background())
	}
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to iterate:" + err.Error(),
			})
			return
		}
		response.LastId = doc.Ref.ID
		data := doc.Data()
		//log.Println(data)
		response.Messages = append(response.Messages, models.Message{SenderId: (int)(data["SenderId"].(int64)),
			Message:  data["Message"].(string),
			DateTime: utils.FormatTime(data["DateTime"].(time.Time))})
	}
	c.JSON(200, response)

}
