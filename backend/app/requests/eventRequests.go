package requests

type EventReq struct {
	EventId int `json:"eventId" binding:"required"`
}
