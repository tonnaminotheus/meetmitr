package requests

type EventReq struct {
	EventId int `json:"eventId" binding:"required"`
}

type EventChangeReq struct {
	EventId     int    `json:"eventId" binding:"required"`
	Description string `json:"description" binding:"required"`
}
