package handlers

import (
	"backend/app/chat"
	"backend/app/responses"
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
	if isDM {
		chatId, err := chatService.GetChatId(userId, otherId)
		if err != nil {
			c.JSON(400, gin.H{
				"message": err,
			})
			return
		}
		roomId := chatService.GetDMRoomId(chatId)
		c.JSON(200, responses.JoinChatResponse{
			Message: "ok",
			RoomId:  roomId,
		})
	}
}
