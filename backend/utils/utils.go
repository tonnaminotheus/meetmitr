package utils

import (
	"crypto/tls"
	"fmt"
	"math/rand"
	"os"
	"time"

	gomail "gopkg.in/mail.v2"
)

type ResponseMessage struct {
	Message string `json:"message" example:"message"`
}

var (
	randomSource  = rand.NewSource(time.Now().UTC().UnixNano())
	random        = rand.New(randomSource)
	MainEmail     = "se2.meetmitr@gmail.com"
	EmailPassword = os.Getenv("prejacksudhod")
	ActivatePath  = "/activate/"
	StoragePath   = "gs://meetmitr-se2.appspot.com/"
	BucketName    = "meetmitr-se2.appspot.com"
	EventUrl      = "/event/"
	LoginPath     = "/loginVerif/"
	InitialPath   = "sth.com"
)

func init() {
	random.Seed(time.Now().UTC().UnixNano())
}

func RandomStringNumber(numberOfDigits int) string {
	numberString := ""

	for d := 0; d < numberOfDigits; d++ {
		numberString += fmt.Sprintf("%d", random.Intn(10))
	}

	return numberString
}

func GetFilePath(fileName string) string {
	return "https://firebasestorage.googleapis.com/v0/b/" + BucketName + "/o/" + fileName + "?alt=media"
}

func FormatTime(t time.Time) string {
	return t.Local().Format("2006-01-02 15:04:05")
}

func SendTextEmail(email, subject, sentence string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", MainEmail)
	m.SetHeader("To", email)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", sentence)

	d := gomail.NewDialer("smtp.gmail.com", 587, MainEmail, EmailPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}

func GetActivatePath() string {
	return InitialPath + ActivatePath
}

func GetLoginPath() string {
	return InitialPath + LoginPath
}
