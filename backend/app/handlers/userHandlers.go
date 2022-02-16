package handlers

import (
	"backend/app/responses"

	"github.com/gin-gonic/gin"
)

func GetUserHandler(c *gin.Context) {
	userId := c.Param("userId")

	user, err := userService.FindUserById(userId)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "no user with this userId",
		})
		return
	}
	userResp := &responses.GetUserResponse{User: *user}
	userResp.ProfilePicUrl = ""
	userResp.Password = ""
	if userResp.HideGender {
		userResp.Gender = "Unspecified"
	}
	userResp.HideGender = false

	c.JSON(200, userResp)

}
