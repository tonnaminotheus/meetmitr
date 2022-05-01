package requests

type LoginRequest struct {
	Email    string `json:"email" example:"ryu" binding:"required"`
	Password string `json:"password" example:"ryu_is_smart" binding:"required"`
	Ip       string `json:"ip"`
}
