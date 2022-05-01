package services

import (
	"backend/app/responses"
	"backend/utils"

	"backend/database"
)

func RegisterRequestValidator(err error) *responses.RegisterResp {
	resp := &responses.RegisterResp{}

	return resp
}

func SendActivationfEmail(email, activateKey string) error {
	sentence := "Please activate your MeetMitr account at\n" + utils.GetActivatePath() + activateKey
	subject := "Please Activate Your MeetMitr Account"
	return utils.SendTextEmail(email, subject, sentence)
}

func RepeatedEmail(email string) bool {
	err := database.Sql.QueryRow("SELECT email FROM User where email = ?", email).Scan(&email)
	return err == nil || err.Error() != "sql: no rows in result set"
}
