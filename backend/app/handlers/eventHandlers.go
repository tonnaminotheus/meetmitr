package handlers

import (
	"backend/app/requests"
	"backend/database"
	"fmt"
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

func PutEventHandler(c *gin.Context) {
	_, err1 := c.Get("user_id")
	if !err1 {
		c.JSON(401, gin.H{
			"message": "oh shit",
		})
		return
	}

	body := &requests.EventChangeReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}

	_, err2 := database.Sql.Query("UPDATE Event SET Event.description=? WHERE Event.eventId=?", body.Description, body.EventId)

	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "Oh yeah",
		})
		return
	}
}

func PostEventJoinHandler(c *gin.Context) {
	_, err1 := c.Get("user_id")
	if !err1 {
		c.JSON(401, gin.H{
			"message": "oh shit",
		})
		return
	}

	body := &requests.EventJoinReq{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(401, gin.H{
			"message": err.Error(),
		})
		return
	}
	//get event price
	var price int
	err_price := database.Sql.QueryRow(`select Event.price from Event where Event.eventId=?`, body.EventId).Scan(&price)
	if err_price != nil {
		c.JSON(500, gin.H{
			"message": err_price.Error(),
		})
		return
	}
	var pay_price int
	pay_price = -price
	//check able to join
	rows_check_join, err_check_join := database.Sql.Query("select Event.name from Event where  Event.eventId=? and Event.price<=(select sum(CoinTransaction.coinAmount) from User,CoinTransaction where User.userId=CoinTransaction.UserId and User.userId=?) and Event.maxParticipant>(select count(*) from UserEventStatus, User where UserEventStatus.UserId=User.userId and UserEventStatus.eventId=?)", body.EventId, body.UserId, body.EventId)
	fmt.Println("ch1")
	if err_check_join != nil {
		c.JSON(500, gin.H{
			"message": err_check_join.Error(),
		})
		return
	}
	fmt.Println("ch2")
	if rows_check_join == nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "cant join",
		})
		return
	} else {
		//pay price
		_, err_pay_price := database.Sql.Query(`INSERT INTO CoinTransaction(coinAmount,createdTimeStamp,UserId)VALUES (?,CURRENT_TIMESTAMP,?)`, pay_price, body.UserId)
		fmt.Println("ch3")
		if err_pay_price != nil {
			c.JSON(500, gin.H{
				"message": "pay fail",
			})
			return
		}
		//update join
		_, err_join := database.Sql.Query(`INSERT INTO UserEventStatus(UserId,eventId,status) VALUES (?,?,'0')`, body.UserId, body.EventId)
		if err_join != nil {
			c.JSON(500, gin.H{
				"message": err_join.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "join success",
		})
		return
	}
}
