package handlers

import (
	"backend/app/requests"
	"backend/database"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEventDescHandler(c *gin.Context) {
	body := &requests.EventReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}

	var description string

	err2 := database.Sql.QueryRow(`SELECT description FROM event WHERE eventId=?`,
		body.EventId).Scan(&description)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"description": description,
	})
}

func GetEventTagsHandler(c *gin.Context) {
	body := &requests.EventReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}

	rows, err2 := database.Sql.Query("select Tag.tagName from Tag,EventTag where Tag.TagId=EventTag.tagId and EventTag.eventId=?", body.EventId)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}

	defer rows.Close()

	var tags []string

	for rows.Next() {
		var tag string
		rows.Scan(&tag)
		tags = append(tags, tag)
	}

	c.JSON(http.StatusOK, gin.H{
		"tagList": tags,
	})
}

func PostEventHandler(c *gin.Context) {
	_, err1 := c.Get("user_id")
	if !err1 {
		utils.SendNotFoundResponse(c, errors.New("no user_id"))
		return
	}

	body := &requests.EventReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}

	rows, err2 := database.Sql.Query("select Tag.tagName from Tag,EventTag where Tag.TagId=EventTag.tagId and EventTag.eventId=?", body.EventId)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}

	defer rows.Close()

	var tags []string

	for rows.Next() {
		var tag string
		rows.Scan(&tag)
		tags = append(tags, tag)
	}

	c.JSON(http.StatusOK, gin.H{
		"tagList": tags,
	})
}
