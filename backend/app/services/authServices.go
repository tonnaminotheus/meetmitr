package services

import (
	"errors"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"

	"backend/app/models"
)

var auth_svc *AuthServiceImpl

type AuthServiceImpl struct {
}

func NewAuthService() *AuthServiceImpl {

	if auth_svc == nil {
		auth_svc = &AuthServiceImpl{}
	}
	return auth_svc

}

func (s *AuthServiceImpl) GetAuthorizationToken(c *gin.Context) (string, error) {
	val := c.Request.Header.Get("Authorization")
	splitToken := strings.Split(val, "Bearer ")

	if len(splitToken) == 2 {
		return splitToken[1], nil
	}

	return "", errors.New("invalid token")
}

func (s *AuthServiceImpl) VerifyToken(token string) (*jwt.Token, error) {
	jwtToken, err := jwt.ParseWithClaims(
		token,
		&models.JwtClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(models.JWTSignedKey), nil
		},
	)

	if err != nil {
		return nil, err
	}

	return jwtToken, nil
}
