package models

type Message struct {
	SenderId int    `json:"senderId"`
	Message  string `json:"message"`
	DateTime string `json:"dateTime"`
}
