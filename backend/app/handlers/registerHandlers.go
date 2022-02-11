package handlers

import (
	"backend/app/requests"
	"backend/app/services"
	"backend/database"
	"backend/utils"
	"time"

	"github.com/gin-gonic/gin"
)

func RegisterHandler(c *gin.Context) {
	body := &requests.RegisterReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}
	hideGender := true
	if body.HideGender != nil {
		hideGender = *body.HideGender
	}
	createdAt := time.Now()
	activeKey := utils.RandomStringNumber(15)
	_, err = database.Sql.Exec(
		`Insert Into PreUser
		(activateKey, email, gender, profileName, birthDate, password, firstName, middleName, lastName, hideGender, createdAt)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		activeKey, body.Email, body.Gender, body.ProfileName, body.BirthDate, body.Password,
		body.FirstName, body.MiddleName, body.LastName, hideGender, createdAt)
	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	err = services.SendActivationfEmail(body.Email, activeKey)
	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.Status(200)
}
