package services

import (
	"backend/app/models"
	"backend/app/requests"
	"backend/database"
	"backend/utils"
	"database/sql"
	"errors"
	"fmt"
	"sync"
)

var userSvc *UserServiceImpl

type ipLog struct {
	ip     string
	userId string
}

var (
	loginKey   = map[string]ipLog{}
	loginMutex = sync.Mutex{}
)

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
	displayPic := sql.NullString{}
	err := database.Sql.QueryRow(`Select *from User where userId = ?`, userId).Scan(&userId, &user.Email, &user.Gender, &user.ProfileName,
		&bio, &user.Birthdate, &user.Password, &user.FirstName, &middleName, &user.LastName, &user.HideGender, &noPenalty, &displayPic)
	if err != nil {
		return nil, err
	}
	user.Bio = bio.String
	user.MiddleName = middleName.String
	user.NumberOfPenalty = int(noPenalty.Int64)
	user.Displaypic = displayPic.String
	return user, nil
}

func (s *UserServiceImpl) UpdateUser(userId string, updateReq *requests.UpdateUserRequest) error {
	oks := []bool{updateReq.Email != nil, updateReq.Gender != nil, updateReq.ProfileName != nil, updateReq.Bio != nil,
		updateReq.Birthdate != nil, updateReq.FirstName != nil, updateReq.MiddleName != nil, updateReq.LastName != nil,
		updateReq.HideGender != nil, updateReq.ProfilePicUrl != nil}
	Email := ""
	if updateReq.Email != nil {
		Email = *updateReq.Email
	}
	Gender := ""
	if updateReq.Gender != nil {
		Gender = *updateReq.Gender
	}

	ProfileName := ""
	if updateReq.ProfileName != nil {
		ProfileName = *updateReq.ProfileName
	}

	Bio := ""
	if updateReq.Bio != nil {
		Bio = *updateReq.Bio
	}

	Birthdate := ""
	if updateReq.Birthdate != nil {
		Birthdate = *updateReq.Birthdate
	}

	FirstName := ""
	if updateReq.FirstName != nil {
		FirstName = *updateReq.FirstName
	}
	MiddleName := ""
	if updateReq.MiddleName != nil {
		MiddleName = *updateReq.MiddleName
	}

	LastName := ""
	if updateReq.LastName != nil {
		LastName = *updateReq.LastName
	}
	HideGender := false
	if updateReq.HideGender != nil {
		HideGender = *updateReq.HideGender
	}
	ProfilePicUrl := ""
	if updateReq.ProfilePicUrl != nil {
		ProfilePicUrl = *updateReq.ProfilePicUrl
	}
	_, err := database.Sql.Exec(`
	Update User  
	Set email = case when ?=true then ? else email end,
		gender = case when ?=true then ? else gender end,
		profileName = case when ?=true then ? else profileName end,
		bio = case when ?=true then ? else bio end,
		birthdate = case when ?=true then ? else birthdate end,
		firstName = case when ?=true then ? else firstName end,
		middleName = case when ?=true then ? else middleName end,
		lastName = case when ?=true then ? else lastName end,
		hideGender = case when ?=true then ? else hideGender end,
		displayPic = case when ?=true then ? else displayPic end
	Where userId = ?`,
		oks[0], Email,
		oks[1], Gender,
		oks[2], ProfileName,
		oks[3], Bio,
		oks[4], Birthdate,
		oks[5], FirstName,
		oks[6], MiddleName,
		oks[7], LastName,
		oks[8], HideGender,
		oks[9], ProfilePicUrl,
		userId)
	return err
}

func (s *UserServiceImpl) CheckIp(userId, ip string) bool {
	var date string
	err := database.Sql.QueryRow("Select timeAdded from IpLog where userId=?", userId).Scan(&date)
	return err == nil
}

func (s *UserServiceImpl) SendLoginVerif(userId, ip, email string) error {
	loginVerifStr := utils.RandomStringNumber(30)
	subject := "Please verify your login"
	sentence := "We detect login at " + ip + "." + "\nIf it is you, then please click this link:" + utils.GetLoginPath() + loginVerifStr + ",or contact us if it is not you"
	err := utils.SendTextEmail(email, subject, sentence)
	if err != nil {
		fmt.Println(err)
		return err
	}
	loginMutex.Lock()
	loginKey[loginVerifStr] = ipLog{userId: userId, ip: ip}
	loginMutex.Unlock()
	return nil

}

func (s *UserServiceImpl) CheckLoginVerif(verifKey string) (bool, string) {
	loginMutex.Lock()
	defer loginMutex.Unlock()
	if _, ok := loginKey[verifKey]; !ok {
		return false, ""
	}
	detail := loginKey[verifKey]
	delete(loginKey, verifKey)
	var err error
	for i := 0; i < 3; i++ {
		_, err = database.Sql.Exec("INSERT INTO IpLog(userId, ip, timeAdded) Values(?,?,Current_time)", detail.userId, detail.ip)
		if err == nil {
			break
		}
	}
	return true, detail.userId
}

func (s *UserServiceImpl) IsAdmin(userId string) bool {
	var adminId string
	err := database.Sql.QueryRow("Select adminId from Admin where userId = ?", adminId).Scan(&adminId)
	return err == nil
}
