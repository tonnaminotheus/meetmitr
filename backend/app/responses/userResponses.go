package responses

import "backend/app/models"

type GetUserResponse struct {
	models.User
	ProfilePicurl string `json:"profilePicUrl"`
}
