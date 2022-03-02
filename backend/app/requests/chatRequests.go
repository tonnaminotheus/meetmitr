package requests

type JoinChatRequest struct {
	IsDM    bool `json:"isDM" binding:"required"`
	OtherId int  `json:"otherId" binding:"required"`
}
