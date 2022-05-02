package responses

import "backend/app/models"

type EventDescResponse struct {
	models.Event
	ParticipantsId    []int    `json:"participantsId"`
	ParticipantsImage []string `json:"participantsImage"`
	CreatorName       string   `json:"creatorName"`
	CreatorImage      string   `json:"creatorImage"`
}
