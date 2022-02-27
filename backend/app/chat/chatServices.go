package chat

import (
	"backend/app/models"
	"backend/database"
	"context"
	"log"
	"net/http"
	"strconv"
)

type ChatServiceImpl struct {
}

var (
	chatSvc      *ChatServiceImpl
	dmRoom       = map[int]*Hub{}
	availableHub = []*Hub{}
)

func NewChatService() *ChatServiceImpl {
	if chatSvc == nil {
		chatSvc = &ChatServiceImpl{}
	}
	return chatSvc
}

func (c *ChatServiceImpl) DMAuthorityCheck(userId, chatId int) bool {
	var userId1, userId2 int
	err := database.Sql.QueryRow("Select UserId1, UserId2 from DMChat where dmChatId = ?", chatId).Scan(&userId1, &userId2)
	if err != nil || (userId1 != userId && userId2 != userId) {
		return false
	}
	return true
}

func (c *ChatServiceImpl) GetChatId(userId, otherId int) (int, error) {
	if userId > otherId {
		userId, otherId = otherId, userId
	}
	var dmChatId int
	err := database.Sql.QueryRow("Select dmChatId from DMChat where UserId1 = ? and UserId2 = ?", userId, otherId).Scan(&dmChatId)
	if err != nil {
		log.Println(err)
		_, err = database.Sql.Exec("Insert into DMChat(UserId1, UserId2) values(?, ?)", userId, otherId)
		if err != nil {
			return -1, err
		}
		database.Sql.QueryRow("Select dmChatId from DMChat where UserId1 = ? and UserId2 = ?", userId, otherId).Scan(&dmChatId)
	}
	return dmChatId, nil

}

func (c *ChatServiceImpl) ConnectDMRoom(chatId, userId int, w http.ResponseWriter, r *http.Request) {
	var thisHub *Hub
	var ok bool
	if thisHub, ok = dmRoom[chatId]; !ok {
		if n := len(availableHub); n > 0 {
			thisHub = availableHub[n-1]
			availableHub[n-1] = nil
			availableHub = availableHub[:n-1]
		} else {
			thisHub = newHub()
			go thisHub.run()
		}
		dmRoom[chatId] = thisHub
	}
	thisHub.roomId = "DM" + strconv.Itoa(chatId)
	serveWs(thisHub, w, r, userId)

}

func saveMessage(roomId string, message models.Message) {
	_, _, err := database.Firestore.Collection(roomId).Add(context.Background(), message)
	if err != nil {
		log.Println(err)
	}

}
