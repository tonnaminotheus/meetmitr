package chat

import (
	"backend/database"
	"backend/utils"
	"log"
)

type ChatServiceImpl struct {
}

var (
	chatSvc  *ChatServiceImpl
	dmRoomId = map[int]string{}
	dmRoom   = map[string]*Hub{}
)

func NewChatService() *ChatServiceImpl {
	if chatSvc == nil {
		chatSvc = &ChatServiceImpl{}
	}
	return chatSvc
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

func (c *ChatServiceImpl) GetDMRoomId(chatId int) string {
	if room, ok := dmRoomId[chatId]; ok {
		return room
	} else {
		for {
			room = utils.RandomStringNumber(30)
			if _, ok := dmRoom[room]; !ok {
				break
			}
		}
		dmRoomId[chatId] = room
		return room
	}
}
