package responses

import "backend/app/models"

type GetUserResponse struct {
	models.User
	ProfilePicUrl string `json:"profilePicUrl"`
}
