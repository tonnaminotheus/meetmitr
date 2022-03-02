package utils

import (
	"fmt"
	"math/rand"
	"time"
)

var (
	randomSource  = rand.NewSource(time.Now().UTC().UnixNano())
	random        = rand.New(randomSource)
	MainEmail     = "meetmitr.se2@gmail.com"
	EmailPassword = "MeetMitrSE2"
	ActivatePath  = "localhost:8080/api/v1/activate/"
	StoragePath   = "gs://meetmitr-se2.appspot.com/"
	BucketName    = "meetmitr-se2.appspot.com"
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
	return "https://firebasestorage.googleapis.com/v0/b/" + BucketName + "/o/" + fileName
}
