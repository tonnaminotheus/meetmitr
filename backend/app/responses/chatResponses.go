package responses

type ChatPartnersResponse struct {
	Partners []Partner `json:"partners"`
}

type Partner struct {
	DMId          int    `json:"DMId"`
	UserId        int    `json:"userId"`
	ProfileName   string `json:"profileName"`
	ProfilePicUrl string `json:"profilePicUrl"`
}
