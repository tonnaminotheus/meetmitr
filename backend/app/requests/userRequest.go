package requests

type UpdateUserRequest struct {
	Email         string `json:"email"`
	Gender        string `json:"gender"`
	ProfileName   string `json:"profileName"`
	Bio           string `json:"bio"`
	Birthdate     string `json:"birthdate"`
	FirstName     string `json:"firstName"`
	MiddleName    string `json:"middleName"`
	LastName      string `json:"lastName"`
	HideGender    bool   `json:"hideGender"`
	ProfilePicUrl string `json:"profilePicUrl"`
}
