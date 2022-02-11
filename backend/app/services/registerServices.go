package services

import (
	"backend/app/responses"
	"backend/utils"
	"crypto/tls"

	"backend/database"

	gomail "gopkg.in/mail.v2"
)

func RegisterRequestValidator(err error) *responses.RegisterResp {
	resp := &responses.RegisterResp{}

	return resp
}

func SendActivationfEmail(email, activateKey string) error {
	sentence := "Please activate your MeetMitr account at\n" + utils.ActivatePath + activateKey
	m := gomail.NewMessage()
	m.SetHeader("From", utils.MainEmail)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Please Activate Your MeetMitr Account")
	m.SetBody("text/plain", sentence)

	d := gomail.NewDialer("smtp.gmail.com", 587, utils.MainEmail, utils.EmailPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func RepeatedEmail(email string) bool {
	err := database.Sql.QueryRow("SELECT email FROM User where email = ?", email).Scan(&email)
	return err == nil || err.Error() != "sql: no rows in result set"
}
