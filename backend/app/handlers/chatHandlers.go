package handlers

import (
	"backend/app/chat"
	"backend/app/responses"
	"backend/database"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

var chatService = chat.NewChatService()

func GetChatRoomHandler(c *gin.Context) {
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
		chatService.ConnectDMRoom(chatId, userId, c.Writer, c.Request)

	}
}

func GetChatPartners(c *gin.Context) {
	userId := c.GetString("user_id")
	log.Println("userId", userId)
	rows, err := database.Sql.Query("Select * From DMChat where UserId1 = ? or UserId2 = ?", userId, userId)
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
	uid, _ := strconv.Atoi(userId)
	resp := responses.ChatPartnersResponse{Partners: []responses.Partner{}}
	defer rows.Close()
	for rows.Next() {
		var dm, u1, u2 int
		rows.Scan(&dm, &u1, &u2)
		log.Println(dm, u1, u2)
		partner := responses.Partner{DMId: dm, UserId: u1 + u2 - uid}
		user, _ := userService.FindUserById(strconv.Itoa(partner.UserId))
		partner.ProfileName = user.ProfileName
		partner.ProfilePicUrl = ""
		resp.Partners = append(resp.Partners, partner)
	}
	c.JSON(200, resp)

}
