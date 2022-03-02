package handlers

import (
	"backend/app/models"
	"backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func NotiHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	rows, err := database.Sql.Query(`select NotiContent,URL,DateTime from Noti where userId=?`, userId)

	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	defer rows.Close()

	notis := []models.Noti{}
	noti := models.Noti{}

	for rows.Next() {
		rows.Scan(&noti.NotiContent, &noti.URL, &noti.DateTime)
		notis = append(notis, noti)
	}

	_, err2 := database.Sql.Query(`UPDATE Noti SET isSeen=1 WHERE userId=?`, userId)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"noti": notis,
	})
}

func NotiCountHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}
	numNoti := 0
	err := database.Sql.QueryRow(`select count(*) from Noti where userId=?`, userId).Scan(&numNoti)

	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"noti": numNoti,
	})
}
