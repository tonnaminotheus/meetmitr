package handlers

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/app/services"
	"backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RateHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	req := &requests.RateReq{}
	err := c.ShouldBindJSON(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	_, err1 := database.Sql.Exec(`DELETE FROM Rate WHERE userId=?`, userId.(string))
	if err1 != nil {
		c.JSON(500, gin.H{
			"message": err1.Error(),
		})
		return
	}

	if req.Game != nil {
		err2 := services.RateTag(userId.(string), "1", req.Game)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}
	if req.Anime != nil {
		err2 := services.RateTag(userId.(string), "2", req.Anime)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}
	if req.Charity != nil {
		err2 := services.RateTag(userId.(string), "3", req.Charity)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}
	if req.Meme != nil {
		err2 := services.RateTag(userId.(string), "4", req.Meme)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}
	if req.Doujin != nil {
		err2 := services.RateTag(userId.(string), "5", req.Doujin)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}
	if req.Sport != nil {
		err2 := services.RateTag(userId.(string), "6", req.Sport)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": err2.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})
}

func GetRateHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	rows, err := database.Sql.Query(
		`select tagId, score from Rate where userId=?`, userId)
	if err != nil || rows == nil {
		message := "No tag found"
		if err != nil {
			message = err.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}

	defer rows.Close()

	var tags []int
	var scores []int
	var tag int
	var score int
	for rows.Next() {
		rows.Scan(&tag, &score)
		tags = append(tags, tag)
		scores = append(scores, score)
	}

	rate := models.Rate{}

	for i, tag := range tags {
		if tag == 1 {
			rate.Game = scores[i]
		}
		if tag == 2 {
			rate.Anime = scores[i]
		}
		if tag == 3 {
			rate.Charity = scores[i]
		}
		if tag == 4 {
			rate.Meme = scores[i]
		}
		if tag == 5 {
			rate.Doujin = scores[i]
		}
		if tag == 6 {
			rate.Sport = scores[i]
		}
	}

	c.JSON(http.StatusOK, rate)
}
