package handlers

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/app/services"
	"backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetEventDescHandler(c *gin.Context) {
	eventId := c.Param("eventId")

	event := models.Event{}

	err := database.Sql.QueryRow(`SELECT * FROM Event WHERE eventId=?`, eventId).Scan(
		&event.EventId, &event.Name, &event.Description, &event.Address, &event.Province,
		&event.ImagUrl, &event.StartTime, &event.EndTime, &event.Onsite, &event.MaxParticipant,
		&event.Price, &event.CreatedTimeStamp, &event.UserID)
	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}

	rows, err2 := database.Sql.Query(
		`select Tag.tagName from Tag,EventTag 
		where Tag.TagId=EventTag.tagId and EventTag.eventId=?`, eventId)
	if err2 != nil || rows == nil {
		c.JSON(500, gin.H{
			"message": err2.Error(),
		})
		return
	}

	defer rows.Close()

	var tag string
	for rows.Next() {
		rows.Scan(&tag)
		event.Tags = append(event.Tags, tag)
	}

	c.JSON(http.StatusOK, event)
}

func GetEventTagsHandler(c *gin.Context) {
	eventId := c.Query("eventId") //Param("eventId")

	var tags []string

	if eventId == "" {
		rows, err := database.Sql.Query(`select tagName from Tag where tagId>=1`)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}

		defer rows.Close()

		var tag string
		for rows.Next() {
			rows.Scan(&tag)
			tags = append(tags, tag)
		}
		c.JSON(http.StatusOK, gin.H{
			"tagList": tags,
		})
		return
	}

	rows, err := database.Sql.Query(
		`select Tag.tagName from Tag,EventTag 
		where Tag.TagId=EventTag.tagId and EventTag.eventId=?`, eventId)
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

	var tag string
	for rows.Next() {
		rows.Scan(&tag)
		tags = append(tags, tag)
	}

	c.JSON(http.StatusOK, gin.H{
		"tagList": tags,
	})
}

func UpdateEventDescHandler(c *gin.Context) {
	_, err1 := c.Get("user_id")
	if !err1 {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	eventId := c.Param("eventId")

	body := &requests.UpdateEventReq{}
	err1 := c.ShouldBindJSON(body)
	if err1 != nil {
		c.JSON(400, gin.H{
			"message": err1.Error(),
		})
		return
	}

	var userId2 string
	err2 := database.Sql.QueryRow("select Event.userId from Event where Event.eventId=?", eventId).Scan(&userId2)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err2.Error(),
		})
		return
	}

func JoinEventHandler(c *gin.Context) {
	_, err1 := c.Get("user_id")
	if !err1 {
		c.JSON(401, gin.H{
			"message": "oh shit",
		})
		return
	}
	err3 := services.UpdateEvent(body, eventId)
	if err3 != nil {
		c.JSON(500, gin.H{"message": err3.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})

}

func JoinEventHandler(c *gin.Context) {
	userId, err := c.Get("user_id")
	if !err {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	eventId := c.Param("eventId")

	//get event price
	var price int
	err1 := database.Sql.QueryRow("select Event.price from Event where Event.eventId=?", eventId).Scan(&price)
	if err1 != nil {
		c.JSON(500, gin.H{
			"message": err1.Error(),
		})
		return
	}
	payPrice := -price

	//check able to join
	var checkJoin *string
	err4 := database.Sql.QueryRow(
		`select Event.eventId from Event where  Event.eventId=? and Event.price<=(select COALESCE(sum(CoinTransaction.coinAmount),0)
		from User,CoinTransaction where User.userId=CoinTransaction.UserId and User.userId=?) and Event.maxParticipant>(select COALESCE(count(*),0) 
		from UserEventStatus, User where UserEventStatus.UserId=User.userId and UserEventStatus.eventId=?)`, eventId, userId, eventId).Scan(&checkJoin)
	if err4 != nil || checkJoin == nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "join not success",
		})
		return
	} else {
		//pay price
		_, err2 := database.Sql.Query(
			`INSERT INTO CoinTransaction(coinAmount,createdTimeStamp,UserId)
			VALUES (?,CURRENT_TIMESTAMP,?)`, payPrice, userId)
		if err2 != nil {
			c.JSON(500, gin.H{
				"message": "payment failure",
			})
			return
		}
		//update join
		_, err3 := database.Sql.Query(
			`INSERT INTO UserEventStatus(UserId,eventId,status) 
			VALUES (?,?,'0')`, userId, eventId)
		if err3 != nil {
			c.JSON(500, gin.H{
				"message": err3.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "join success",
		})
		return
	}
}

func CreateEventHandler(c *gin.Context) {
	userId, err := c.Get("user_id")
	if !err {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	req := &requests.CreateEventReq{}
	err1 := c.ShouldBindJSON(req)
	if err1 != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err1.Error(),
		})
		return
	}

	_, err2 := database.Sql.Exec(
		`INSERT INTO Event 
		VALUES (null, ?, ?, ?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP,?)`,
		req.Name, req.Description, req.Address, req.Province, req.ImagUrl, req.StartTime,
		req.EndTime, req.Onsite, req.MaxParticipant, *req.Price, userId)

	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err2.Error(),
		})
		return
	}

	var eventId int
	err3 := database.Sql.QueryRow(`SELECT LAST_INSERT_ID();`).Scan(&eventId)

	if err3 != nil {
		c.JSON(500, gin.H{
			"message": err3.Error(),
		})
		return
	}

	for _, tag := range req.Tags {

		_, err4 := database.Sql.Exec(
			`INSERT INTO EventTag
			VALUES (?,?);`,
			tag, eventId)

		if err4 != nil {
			c.JSON(500, gin.H{
				"message": err4.Error(),
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "create success",
	})

}
