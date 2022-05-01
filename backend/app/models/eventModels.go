package models

type Event struct {
	EventId          int      `json:"eventId"`
	Name             string   `json:"name"`
	Description      string   `json:"description"`
	Tags             []string `json:"tags"`
	Address          string   `json:"address"`
	Province         string   `json:"province"`
	ImagUrl          []string `json:"imagUrl"`
	StartTime        string   `json:"startTime"`
	EndTime          string   `json:"endTime"`
	Onsite           bool     `json:"onsite"`
	MaxParticipant   int      `json:"maxParticipant"`
	Price            int      `json:"price"`
	CreatedTimeStamp string   `json:"createdTimeStamp"`
	UserID           int      `json:"creatorId"`
	Participants     []string `json:"participants"`
	IsJoin           bool     `json:"isJoin"`
}

type EventHome struct {
	EventId   int      `json:"eventId"`
	Name      string   `json:"name"`
	Tags      []string `json:"tags"`
	Address   string   `json:"address"`
	Province  string   `json:"province"`
	StartTime string   `json:"startTime"`
	Images    []string `json:"images"`
}
