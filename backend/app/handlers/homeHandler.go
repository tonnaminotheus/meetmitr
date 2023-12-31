package handlers

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/database"
	"net/http"
	"sort"
	"strconv"

	"github.com/gin-gonic/gin"
)

func HomeWithAvtHandler(c *gin.Context) {
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
	body := &requests.HomeAvtRequest{}
	err1 = c.ShouldBindJSON(body)
	if err1 != nil {
		c.JSON(400, gin.H{
			"message": err1.Error(),
		})
		return
	}
	EventPerPage := 100
	startRow := (intNumPage-1)*EventPerPage + 1
	endRow := intNumPage * EventPerPage
	rows, err := database.Sql.Query(
		`select ID,N,A,P,ST
		from (select ID,N,A,P,ST
				from
				(SELECT ROW_NUMBER() OVER (Order by eventId) AS RowNumber, Event.eventId as ID, Event.name as N, 
																Event.address as A, Event.province as P, Event.startTime as ST
				FROM Event
				WHERE startTime >= ? and endTime <= ?) as sq
				where RowNumber>=? and RowNumber<=?) as sqq`, body.StartTime, body.EndTime, startRow, endRow)

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
	var mp = make(map[int]int)
	var tag string
	var counter int
	counter = 0
	for rows.Next() {
		rows.Scan(&eventHome.EventId, &eventHome.Name, &eventHome.Address,
			&eventHome.Province, &eventHome.StartTime)
		counterIdx, ok := mp[eventHome.EventId]
		if ok {
			eventHomes[counterIdx].Tags = append(eventHomes[counterIdx].Tags, tag)
		} else {
			eventHome.Tags = []string{}
			eventHome.Images = []string{}
			eventHomes = append(eventHomes, eventHome)
			mp[eventHome.EventId] = counter
			counter += 1
		}
	}

	rows2, err2 := database.Sql.Query(`select * from EventImage`)

	if err2 != nil || rows2 == nil {
		message := "No image found"
		if err2 != nil {
			message = err2.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}

	defer rows2.Close()
	var imgUrl string
	var eventId int
	for rows2.Next() {
		rows2.Scan(&imgUrl, &eventId)
		counterIdx, ok := mp[eventId]
		if ok {
			eventHomes[counterIdx].Images = append(eventHomes[counterIdx].Images, imgUrl)
		}
	}

	rows3, err3 := database.Sql.Query(`select EventTag.eventId, Tag.tagName
	from Tag,EventTag
	where Tag.tagId=EventTag.tagId`)

	if err3 != nil || rows3 == nil {
		message := "No tag found"
		if err3 != nil {
			message = err3.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}

	defer rows2.Close()
	for rows3.Next() {
		rows3.Scan(&eventId, &tag)
		counterIdx, ok := mp[eventId]
		if ok {
			eventHomes[counterIdx].Tags = append(eventHomes[counterIdx].Tags, tag)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"EventList": eventHomes,
	})

}

func HomeHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	tagRows, errT := database.Sql.Query(`select Tag.tagName,Rate.score from Rate,Tag where userId=? and Rate.tagId=Tag.tagId;`, userId)

	if errT != nil || tagRows == nil {
		message := "No user tag found"
		if errT != nil {
			message = errT.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}
	var mpScore = make(map[string]int)
	var tagUser string
	var scoreUser int
	for tagRows.Next() {
		tagRows.Scan(&tagUser, &scoreUser)
		mpScore[tagUser] = scoreUser
	}

	stringNumPage := c.Param("numPage")
	intNumPage, err1 := strconv.Atoi(stringNumPage)
	if err1 != nil {
		c.JSON(500, gin.H{
			"message": err1.Error(),
		})
		return
	}
	EventPerPage := 6
	startRow := (intNumPage-1)*EventPerPage + 1
	endRow := intNumPage * EventPerPage
	rows, err := database.Sql.Query(
		`select ID,N,A,P,ST
		from (select ID,N,A,P,ST
				from
				(SELECT ROW_NUMBER() OVER (Order by eventId) AS RowNumber, Event.eventId as ID, Event.name as N, 
																Event.address as A, Event.province as P, Event.startTime as ST
				FROM Event) as sq
				where RowNumber>=? and RowNumber<=?) as sqq`, 1, 100)

	//fmt.Println(rows)

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
	eventHomes := []models.EventHomeScore{}
	eventHome := models.EventHomeScore{}
	var mp = make(map[int]int)
	var mpEventScore = make(map[int]int)
	var tag string
	var counter int
	counter = 0
	for rows.Next() {
		rows.Scan(&eventHome.EventId, &eventHome.Name, &eventHome.Address,
			&eventHome.Province, &eventHome.StartTime)

		counterIdx, ok := mp[eventHome.EventId]
		if ok {
			eventHomes[counterIdx].Tags = append(eventHomes[counterIdx].Tags, tag)
		} else {
			eventHome.Tags = []string{}
			eventHome.Images = []string{}
			eventHome.Score = 0
			eventHomes = append(eventHomes, eventHome)
			mp[eventHome.EventId] = counter
			mpEventScore[eventHome.EventId] = 0
			counter += 1
		}
	}

	rows2, err2 := database.Sql.Query(`select * from EventImage`)

	if err2 != nil || rows2 == nil {
		message := "No image found"
		if err2 != nil {
			message = err2.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}

	defer rows2.Close()
	var imgUrl string
	var eventId int
	for rows2.Next() {
		rows2.Scan(&imgUrl, &eventId)
		counterIdx, ok := mp[eventId]
		if ok {
			eventHomes[counterIdx].Images = append(eventHomes[counterIdx].Images, imgUrl)
		}
	}

	rows3, err3 := database.Sql.Query(`select EventTag.eventId, Tag.tagName
	from Tag,EventTag
	where Tag.tagId=EventTag.tagId`)

	if err3 != nil || rows3 == nil {
		message := "No tag found"
		if err3 != nil {
			message = err3.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}

	defer rows2.Close()

	for rows3.Next() {
		rows3.Scan(&eventId, &tag)
		counterIdx, ok := mp[eventId]
		if ok {
			eventHomes[counterIdx].Tags = append(eventHomes[counterIdx].Tags, tag)
			eventHomes[counterIdx].Score = eventHomes[counterIdx].Score + mpScore[tag]
		}
	}

	sort.Slice(eventHomes, func(i, j int) bool {
		return eventHomes[i].Score > eventHomes[j].Score
	})
	//fmt.Println(eventHomes)

	eventHomesFinal := []models.EventHome{}
	var cc = 0
	eventHome2 := models.EventHome{}
	for _, ev := range eventHomes {
		cc += 1
		if cc >= startRow && cc <= endRow {
			eventHome2.EventId = ev.EventId
			eventHome2.Name = ev.Name
			eventHome2.Address = ev.Address
			eventHome2.Province = ev.Province
			eventHome2.StartTime = ev.StartTime
			eventHome2.Tags = ev.Tags
			eventHome2.Images = ev.Images
			eventHomesFinal = append(eventHomesFinal, eventHome2)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"EventList": eventHomesFinal,
	})

}
