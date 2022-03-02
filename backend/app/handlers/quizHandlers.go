package handlers

import (
	"backend/app/models"
	// "backend/app/requests"
	// "backend/app/services"
	"backend/database"
	"net/http"
	
	"github.com/gin-gonic/gin"
)
func GetQuizHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	body := &models.Quiz{}
	// err1 := c.ShouldBindJSON(body)
	// if err1 != nil {
	// 	c.JSON(400, gin.H{
	// 		"message": err1.Error(),
	// 	})
	// 	return
	// }

	err2 := database.Sql.QueryRow("select * from Quiz where Quiz.userId=?", userId).Scan(&body.UserId,&body.Onsite,&body.Weekend,&body.People,&body.StartTime,&body.EndTime)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err2.Error(),
		})
		return
	}
	
	c.JSON(200, body)


}


func SendQuizHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	// if !ok {
	// 	c.JSON(401, gin.H{
	// 		"message": "invalid token",
	// 	})
	// 	return
	// }

	body := &models.Quiz{}
	err1 := c.ShouldBindJSON(body)
	if err1 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err1.Error(),
		})
		return
	}


	_, err2 := database.Sql.Exec(
		`INSERT INTO Quiz 
		VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`,
		userId,body.Onsite,body.Weekend,body.People,body.EndTime)

	if err2 != nil {

		_, err4 := database.Sql.Exec("DELETE FROM Quiz WHERE userId=?", userId)

		if err4 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}

		_, err3 := database.Sql.Exec(
			`INSERT INTO Quiz 
			VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`,
			userId,body.Onsite,body.Weekend,body.People,body.EndTime)

		if err3 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}

	// eventId, err3 := stmt.LastInsertId()
	// if err3 != nil {
	// 	c.JSON(500, gin.H{
	// 		"message": err3.Error(),
	// 	})
	// 	return
	// }
	

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})

}