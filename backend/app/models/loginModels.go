package models

import (
	"github.com/dgrijalva/jwt-go"
)

type JwtClaims struct {
	UserID     string `json:"userId"`
	Authorized bool   `json:"authorized"`
	jwt.StandardClaims
}

var JWTSignedKey string

type IpLog struct {
	Id        int    `json:"id"`
	UserId    int    `json:"userId"`
	Ip        string `json:"ip"`
	TimeAdded string `json:"timeAdded"`
}
