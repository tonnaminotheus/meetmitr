package responses

import "backend/app/models"

type ChatPartnersResponse struct {
	Partners []Partner `json:"partners"`
}

type Partner struct {
	DMId          int    `json:"DMId"`
	UserId        int    `json:"userId"`
	ProfileName   string `json:"profileName"`
	ProfilePicUrl string `json:"profilePicUrl"`
	LastMessage   string `json:"lastMessage"`
	LastMessageId string `json:"lastMessageId"`
}

type ChatHistoryResponse struct {
	Messages []models.Message `json:"chatHistory"`
	LastId   string           `json:"lastId"`
}
