package responses

type JoinChatResponse struct {
	Message string `json:"message"`
	RoomId  string `json:"roomId"`
}
