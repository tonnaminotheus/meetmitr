package models

type Quiz struct {
	UserId		int      `json:"userId"`
	Onsite		int      `json:"onsite"`
	Weekend		int      `json:"weekend"`
	People		int      `json:"people"`
	StartTime	string   `json:"startTime"`
	EndTime		string   `json:"endTime"`
}
