package chat

import (
	"backend/app/models"
	"backend/database"
	"backend/utils"
	"context"
	"errors"
	"log"
	"net/http"
	"strconv"
	"time"
)

type ChatServiceImpl struct {
}

type pair struct {
	chatId int
	userId int
}

var (
	chatSvc      *ChatServiceImpl
	dmRoom       = map[int]*Hub{}
	availableHub = []*Hub{}
	tokens       = map[string]pair{}
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
	t, _ := time.Parse("2006-01-02 15:04:05", message.DateTime)
	t = t.Add(time.Hour * -7)
	msg := map[string]interface{}{"SenderId": message.SenderId, "Message": message.Message, "DateTime": t}
	_, _, err := database.Firestore.Collection(roomId).Add(context.Background(), msg)
	if err != nil {
		log.Println(err)
	}

}

func (c *ChatServiceImpl) CheckToken(token string) (int, int, error) {
	if _, ok := tokens[token]; !ok {
		return -1, -1, errors.New("invalid token")
	}
	id := tokens[token]
	delete(tokens, token)
	return id.chatId, id.userId, nil
}

func (c *ChatServiceImpl) CreateToken(chatId, userId int) string {
	token := utils.RandomStringNumber(30)
	for {
		if _, ok := tokens[token]; !ok {
			break
		}
		token = utils.RandomStringNumber(30)
	}
	tokens[token] = pair{chatId: chatId, userId: userId}
	return token
}
