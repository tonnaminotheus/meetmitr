package models

type Noti struct {
	NotiContent string `json:"notiContent"`
	URL         string `json:"url"`
	DateTime    string `json:"dateTime"`
}
