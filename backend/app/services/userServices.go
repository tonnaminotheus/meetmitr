package services

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/database"
	"database/sql"
	"errors"
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

	if hashedPassword != password {
		return "", errors.New("message: The email address you entered does not exist or wrong password")
	}

	return userId, err
}

func (s *UserServiceImpl) FindUserById(userId string) (*models.User, error) {
	bio := sql.NullString{}
	middleName := sql.NullString{}
	noPenalty := sql.NullInt64{}
	user := &models.User{}
	err := database.Sql.QueryRow(`Select *from User where userId = ?`, userId).Scan(&userId, &user.Email, &user.Gender, &user.ProfileName,
		&bio, &user.Birthdate, &user.Password, &user.FirstName, &middleName, &user.LastName, &user.HideGender, &noPenalty)
	if err != nil {
		return nil, err
	}
	user.Bio = bio.String
	user.MiddleName = middleName.String
	user.NumberOfPenalty = int(noPenalty.Int64)
	return user, nil
}

func (s *UserServiceImpl) UpdateUser(userId string, updateReq *requests.UpdateUserRequest) error {
	oks := []bool{updateReq.Email != nil}
	_, err := database.Sql.Exec(`Update User
	SET email = case when `)
}
