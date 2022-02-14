package models

type Event struct {
	EventId          int      `json:"eventId"`
	Name             string   `json:"name"`
	Description      string   `json:"description"`
	Tags             []string `json:"tags"`
	Address          string   `json:"address"`
	Province         string   `json:"province"`
	ImagUrl          string   `json:"imagUrl"`
	StartTime        string   `json:"startTime"`
	EndTime          string   `json:"endTime"`
	Onsite           bool     `json:"onsite"`
	MaxParticipant   int      `json:"maxParticipant"`
	Price            int      `json:"price"`
	CreatedTimeStamp string   `json:"createdTimeStamp"`
	UserID           int      `json:"creatorId"`
}
