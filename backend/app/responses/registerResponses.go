package responses

type RegisterResp struct {
	Message     string `json:"message,omitempty"`
	Email       string `json:"email,omitempty"`
	ProfileName string `json:"profileName,omitempty"`
	PhoneNo     string `json:"phoneNo,omitempty"`
	BirthDate   string `json:"birthDate,omitempty"`
	Password    string `json:"password,omitempty"`
	FirstName   string `json:"firstName,omitempty"`
	LastName    string `json:"lastName,omitempty"`
}
