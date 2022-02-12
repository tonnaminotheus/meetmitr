package services

import (
	"backend/database"

	"golang.org/x/crypto/bcrypt"
)

var userSvc *UserServiceImpl


type UserServiceImpl struct {
}

// NewService create new service
func NewUserService() *UserServiceImpl {
	if userSvc == nil {
		userSvc = &UserServiceImpl{}
	}
	return userSvc
}

// FindUserByUsernameAndPassword find user by username and password
func (s *UserServiceImpl) FindUserByUsernameAndPassword(email, password string) (string, error) {

	var userId string
	var hashedPassword string
	err := database.Sql.QueryRow("SELECT userId, password FROM User WHERE email = ?", email).Scan(&userId, &hashedPassword)

	if err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)); err != nil {
		return "", err
	}

	return userId, err
}
