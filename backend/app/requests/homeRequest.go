package requests

type HomeAvtRequest struct {
	StartTime string `json:"startTime" binding:"required"`
	EndTime   string `json:"EndTime" binding:"required"`
}
