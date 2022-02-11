package handlers

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/app/services"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var userService = services.NewUserService()

func LoginHandler(c *gin.Context) {

	req := &requests.LoginRequest{}
	err := c.ShouldBindJSON(req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "bad request",
		})
		return
	}

	userId, err := userService.FindUserByUsernameAndPassword(req.Email, req.Password)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "The email address you entered does not exist or wrong password.",
		})
		return
	}

	// token, err := createToken("1") bug
	access_token, refresh_token, err := CreateToken(userId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"AccessToken":  access_token,
		"RefreshToken": refresh_token,
		"UserID":       userId,
	})
}

func CreateToken(userID string) (string, string, error) {

	x := models.JwtClaims{
		Authorized: true,
		UserID:     userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2400).Unix(),
		},
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, x)

	access_token, err := at.SignedString([]byte(models.JWTSignedKey))
	if err != nil {
		return "", "", err
	}

	y := models.JwtClaims{
		Authorized: false,
		UserID:     userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}

	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, y)
	refresh_token, err := rt.SignedString([]byte(models.JWTSignedKey))

	if err != nil {
		return access_token, "", err
	}

	return access_token, refresh_token, nil
}
