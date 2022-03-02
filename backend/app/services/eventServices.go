package services

import (
	"backend/app/requests"
	"backend/database"
)

func UpdateEvent(body *requests.UpdateEventReq, eventId string) error {

	if body.Name != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.name=? WHERE Event.eventId=?", body.Name, eventId)
		if err != nil {
			return err
		}
	}
	if body.Description != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.description=? WHERE Event.eventId=?", body.Description, eventId)
		if err != nil {
			return err
		}
	}
	if body.Address != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.address=? WHERE Event.eventId=?", body.Address, eventId)
		if err != nil {
			return err
		}
	}
	if body.Province != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.province=? WHERE Event.eventId=?", body.Province, eventId)
		if err != nil {
			return err
		}
	}
	if body.ImagUrl != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.imagURL=? WHERE Event.eventId=?", body.ImagUrl, eventId)
		if err != nil {
			return err
		}
	}
	if body.StartTime != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.startTime=? WHERE Event.eventId=?", body.StartTime, eventId)
		if err != nil {
			return err
		}
	}
	if body.EndTime != "" {
		_, err := database.Sql.Query("UPDATE Event SET Event.endTime=? WHERE Event.eventId=?", body.EndTime, eventId)
		if err != nil {
			return err
		}
	}
	if body.Tags != nil {
		//delete old
		_, err := database.Sql.Query("DELETE FROM EventTag WHERE eventId = ?", eventId)
		if err != nil {
			return err
		}
		//add new
		for _, tag := range body.Tags {
			_, err2 := database.Sql.Exec(
				`INSERT INTO EventTag
				VALUES (?,?);`,
				tag, eventId)
			if err2 != nil {
				return err2
			}
		}
	}
	if body.Onsite != nil {
		_, err := database.Sql.Query("UPDATE Event SET Event.onsite=? WHERE Event.eventId=?", *body.Onsite, eventId)
		if err != nil {
			return err
		}
	}
	if body.MaxParticipant != nil {
		var maxnow int
		err := database.Sql.QueryRow("select COALESCE(count(*),0) FROM UserEventStatus WHERE eventId=?", eventId).Scan(&maxnow)
		if err != nil {
			return err
		}
		if *body.MaxParticipant < maxnow {
			*body.MaxParticipant = maxnow
		}
		_, err2 := database.Sql.Query("UPDATE Event SET Event.maxParticipant=? WHERE Event.eventId=?", *body.MaxParticipant, eventId)
		if err2 != nil {
			return err2
		}
	}
	if body.Price != nil {
		_, err := database.Sql.Query("UPDATE Event SET Event.price=? WHERE Event.eventId=?", *body.Price, eventId)
		if err != nil {
			return err
		}
	}

	return nil
}
