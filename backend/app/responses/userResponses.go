package responses

import "backend/app/models"

type GetUserResponse struct {
	models.User
	ProfilePicUrl string `json:"profilePicUrl"`
}

type GetVerifReqResponse struct {
	UserId     int    `json:"userId" example:"5"`
	FirstName  string `json:"firstName" example:"Jade"`
	LastName   string `json:"lastName" example:"Piromsopee"`
	DisplayPic string `json:"displayPic" example:"example.com"`
}
