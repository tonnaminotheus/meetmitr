package handlers

import (
	"backend/app/services"
	"backend/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func UploadFileHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	f, uploadedFile, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{
			"message": "invalid file",
		})
		return
	}
	temp := strings.Split(uploadedFile.Filename, ".")
	fileFormat := "." + temp[len(temp)-1]
	link, err := services.UploadFile("u"+userId+"_", utils.BucketName, fileFormat, f)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "file uploaded successfully",
		"url":     link,
	})
}
