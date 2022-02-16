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
		resp.Partners = append(resp.Partners, partner)
	}
	c.JSON(200, resp)

}
