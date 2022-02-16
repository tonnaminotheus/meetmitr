package models

import (
	"time"
)

type admin struct {
	employeeId int
}

type cointransaction struct {
	transactionId   int
	coinAmount      int
	createTimeStamp time.Time
	userId          int
}

type displaypic struct {
	displayPicId  int
	displayPicURL string
	userId        int
}

type dmchat struct {
	chatId int
}

type event struct {
	eventId          int
	name             string
	description      string
	tags             []int
	address          string
	province         string
	imagUrl          string
	startTime        string
	endTime          string
	onsite           bool
	maxParticipant   int
	price            int
	createdTimeStamp string
	userID           int
}

type eventchat struct {
	chatId int
}

type eventtag struct {
	tagId   int
	eventId int
}

type friendwidth struct {
	userId1 int
	userId2 int
}

type has struct {
	userId        int
	personalityId int
}

type host struct {
	userId     int
	employeeId int
}

type personalities struct {
	personalityId   int
	personalityName string
}

type report struct {
	reportId         int
	createdTimeStamp time.Time
	reportedUserId   int
	reason           string
	userId           int
	employeeId       int
}

type tag struct {
	tagId   int
	tagName string
}

type user struct {
	userId      int
	Email       string
	Gender      string
	profileName string
	phoneName   string
	bio         string
	birthdate   time.Time
}

type usereventstatus struct {
	userId  int
	eventId int
	status  string
}
