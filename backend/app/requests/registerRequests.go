package requests

type RegisterReq struct {
	Email       string `json:"email" binding:"required"`
	Gender      string `json:"gender"`
	BirthDate   string `json:"birthDate" binding:"required"`
	Password    string `json:"password" binding:"required"`
	FirstName   string `json:"firstName" binding:"required"`
	MiddleName  string `json:"middleName" `
	LastName    string `json:"lastName" binding:"required"`
	HideGender  *bool  `json:"hideGender"`
}
