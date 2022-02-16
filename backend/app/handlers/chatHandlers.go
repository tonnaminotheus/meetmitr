package handlers

import (
	"backend/app/chat"
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
