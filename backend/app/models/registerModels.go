package models

import (
	"time"
)

type Admin struct {
	EmployeeId int
}

type Cointransaction struct {
	TransactionId   int
	CoinAmount      int
	CreateTimeStamp time.Time
	UserId          int
}

type Displaypic struct {
	DisplayPicId  int
	DisplayPicURL string
	UserId        int
}

type DmChat struct {
	ChatId int
}

type EventChat struct {
	ChatId int
}

type Eventtag struct {
	TagId   int
	EventId int
}

type Friendwidth struct {
	UserId1 int
	UserId2 int
}

type Has struct {
	UserId        int
	PersonalityId int
}

type Host struct {
	UserId     int
	EmployeeId int
}

type Personalities struct {
	PersonalityId   int
	PersonalityName string
}

type Report struct {
	ReportId         int
	CreatedTimeStamp time.Time
	ReportedUserId   int
	Reason           string
	UserId           int
	EmployeeId       int
}

type Tag struct {
	TagId   int
	TagName string
}

type User struct {
	UserId          int    `json:"userId"`
	Email           string `json:"email"`
	Gender          string `json:"gender"`
	ProfileName     string `json:"profileName"`
	Bio             string `json:"bio"`
	Birthdate       string `json:"birthdate"`
	Password        string `json:"password,omitempty"`
	FirstName       string `json:"firstName"`
	MiddleName      string `json:"middleName"`
	LastName        string `json:"lastName"`
	HideGender      bool   `json:"hideGender,omitempty"`
	NumberOfPenalty int    `json:"numberOfPenalty"`
	Displaypic      string `json:"displayPic"`
}
type Usereventstatus struct {
	UserId  int
	EventId int
	Status  string
}
