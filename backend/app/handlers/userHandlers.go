package handlers

import (
	"backend/app/responses"
	"backend/database"
	"database/sql"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetUserHandler(c *gin.Context) {
	userId := c.Param("userId")
	userResp := &responses.GetUserResponse{}
	bio := sql.NullString{}
	middleName := sql.NullString{}
	noPenalty := sql.NullInt64{}
	err := database.Sql.QueryRow(`Select email, gender, profileName, bio, birthdate, firstName, middleName, lastName, hideGender, numberOfPenalty
	from User where userId = ?`, userId).Scan(&userResp.Email, &userResp.Gender, &userResp.ProfileName, &bio, &userResp.Birthdate,
		&userResp.FirstName, &middleName, &userResp.LastName, &userResp.HideGender, &noPenalty)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{
			"message": "no user with this userId",
		})
		return
	}
	if userResp.HideGender {
		userResp.Gender = "unspecified"
	}
	userResp.HideGender = false
	userResp.Bio = bio.String
	userResp.MiddleName = middleName.String
	userResp.NumberOfPenalty = int(noPenalty.Int64)
	userResp.UserId, _ = strconv.Atoi(userId)

	c.JSON(200, userResp)

}
