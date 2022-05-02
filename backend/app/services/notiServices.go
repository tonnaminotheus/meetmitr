package services

import (
	"backend/app/models"
	"backend/database"
)

func AppendNoti(noti *models.Noti) error {
	_, err := database.Sql.Exec(`INSERT INTO Noti(notiContent, url, dateTime,isSeen,userId)
	Values(?,?,CURRENT_TIME,false,?)`, noti.NotiContent, noti.URL, noti.UserId)
	return err
}
