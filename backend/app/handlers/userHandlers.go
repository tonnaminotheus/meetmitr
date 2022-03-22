package handlers

import (
	"backend/app/requests"
	"backend/app/responses"
	"backend/app/services"

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

func UpdateUserHandler(c *gin.Context) {
	userId := c.GetString("userId")

	body := &requests.UpdateUserRequest{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err,
		})
		return
	}
	err = services.UpdateUser(userId, body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err,
		})
		return
	} else {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	}
}
