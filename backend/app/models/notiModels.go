package models

type Noti struct {
	NotiId      int    `json:"notiId"`
	NotiContent string `json:"notiContent"`
	URL         string `json:"url"`
	DateTime    string `json:"dateTime"`
	IsSeen      string `json:"isSeen"`
	UserId      int    `json:"userId"`
}
