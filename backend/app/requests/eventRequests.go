package requests

type EventReq struct {
	EventId int `json:"eventId" binding:"required"`
}

type EventChangeReq struct {
	Description string `json:"description" binding:"required"`
}

type EventJoinReq struct {
	UserId int    `json:"userId" binding:"required"`
	Status string `json:"status"`
}

type CreateEventReq struct {
	Name           string   `json:"name" binding:"required"`
	Description    string   `json:"description" binding:"required"`
	Address        string   `json:"address" binding:"required"`
	Province       string   `json:"province" binding:"required"`
	ImagUrl        []string `json:"imagUrl"`
	StartTime      string   `json:"startTime" binding:"required"`
	EndTime        string   `json:"endTime" binding:"required"`
	Tags           []int    `json:"tags"`
	Onsite         bool     `json:"onsite" binding:"required"`
	MaxParticipant int      `json:"maxParticipant" binding:"required"`
	Price          *int     `json:"price" binding:"required"`
}

type UpdateEventReq struct {
	Name           string   `json:"name"`
	Description    string   `json:"description"`
	Address        string   `json:"address"`
	Province       string   `json:"province"`
	ImagUrl        []string `json:"imagUrl"`
	StartTime      string   `json:"startTime"`
	EndTime        string   `json:"endTime"`
	Tags           []int    `json:"tags"`
	Onsite         *bool    `json:"onsite"`
	MaxParticipant *int     `json:"maxParticipant"`
	Price          *int     `json:"price"`
}
