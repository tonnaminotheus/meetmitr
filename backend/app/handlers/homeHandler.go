package handlers

import (
	"backend/app/models"
	"backend/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func HomeHandler(c *gin.Context) {
	_, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	stringNumPage := c.Param("numPage")
	intNumPage, err1 := strconv.Atoi(stringNumPage)
	if err1 != nil {
		c.JSON(500, gin.H{
			"message": err1.Error(),
		})
		return
	}
	EventPerPage := 5
	startRow := (intNumPage - 1) * EventPerPage
	endRow := intNumPage * EventPerPage
	rows, err := database.Sql.Query(
		`select ID,N,A,P,ST,IM
		from
		(SELECT ROW_NUMBER() OVER (Order by eventId) AS RowNumber, Event.eventId as ID, Event.name as N, 
														Event.address as A, Event.province as P, Event.startTime as ST, 
														Event.imagURL as IM
		FROM Event) as sq
		where RowNumber>=? and RowNumber<=?`, startRow, endRow)

	if err != nil || rows == nil {
		message := "No event found"
		if err != nil {
			message = err.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}
	defer rows.Close()
	eventHomes := []models.EventHome{}
	eventHome := models.EventHome{}

	for rows.Next() {
		rows.Scan(&eventHome.EventId, &eventHome.Name, &eventHome.Address,
			&eventHome.Province, &eventHome.StartTime, &eventHome.ImagUrl)
		eventHomes = append(eventHomes, eventHome)
	}

	c.JSON(http.StatusOK, gin.H{
		"EventList": eventHomes,
	})

}
