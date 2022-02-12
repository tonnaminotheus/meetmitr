package models

import (
	"github.com/dgrijalva/jwt-go"
	
)

type User struct {
	UserID string `bson:"_id" json:"userId"`
}

type JwtClaims struct {
	UserID     string `json:"userId"`
	Authorized bool   `json:"authorized"`
	jwt.StandardClaims
}

var JWTSignedKey string