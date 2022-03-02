package handlers

import (
	"backend/app/requests"
	"backend/app/responses"
	"backend/app/services"
	"backend/database"
	"backend/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func RegisterHandler(c *gin.Context) {
	body := &requests.RegisterReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}
	if services.RepeatedEmail(body.Email) {
		c.JSON(400, gin.H{
			"message": "repeated email",
		})
		return
	}
	if body.Gender == "" {
		body.Gender = "Unspecified"
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
		activeKey, body.Email, body.Gender, body.FirstName + " " + body.LastName, body.BirthDate, body.Password,
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
	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})
}

func ActivateUserHandler(c *gin.Context) {
	activateKey := c.Param("activStr")
	var email, gender, profileName, birthDate, password, firstName, middleName, lastName string
	var hideGender bool
	err := database.Sql.QueryRow(`SELECT email, gender, profileName, birthDate, password, firstName, middleName, lastName, hideGender 
		from PreUser where activateKey = ?`, activateKey).Scan(&email, &gender, &profileName, &birthDate, &password, &firstName, &middleName, &lastName, &hideGender)
	if err != nil {
		c.JSON(401, gin.H{
			"message": "activation failed",
		})
		return
	}
	_, err = database.Sql.Exec(
		`Insert Into User
		(email, gender, profileName, birthDate, password, firstName, middleName, lastName, hideGender)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		email, gender, profileName, birthDate, password, firstName, middleName, lastName, hideGender)

	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	_, _ = database.Sql.Exec("DELETE From PreUser where activateKey = ?", activateKey)
	c.JSON(200, responses.ActivateResp{
		Message:   "activated",
		FirstName: firstName,
		LastName:  lastName,
	})
}
