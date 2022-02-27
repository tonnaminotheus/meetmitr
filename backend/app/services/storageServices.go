package services

import (
	"backend/database"
	"backend/utils"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"time"
)

func UploadFile(user, bucket, fileFormat string, f multipart.File) (string, error) {
	ctx := context.Background()
	fileName := fmt.Sprintf("%v%v%v", user, time.Now().Unix(), utils.RandomStringNumber(10)) + fileFormat

	sw := database.Bucket.Object(fileName).NewWriter(ctx)

	if _, err := io.Copy(sw, f); err != nil {
		return "", err
	}

	if err := sw.Close(); err != nil {
		return "", err
	}
	return utils.GetFilePath(fileName), nil
}
