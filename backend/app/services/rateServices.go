package services

import (
	"backend/app/requests"
	"backend/database"
)

func RateTag(userId, tagId string, score *int) error {
	if *score == 0 {
		return nil
	}
	_, err2 := database.Sql.Query(
		`INSERT INTO Rate(userId, tagId, score)
		VALUES (?,?,?)`, userId, tagId, *score)
	if err2 != nil {
		return err2
	}

	return nil
}

func UpdateUser(userId string, updateReq *requests.UpdateUserRequest) error {
	return nil
}
