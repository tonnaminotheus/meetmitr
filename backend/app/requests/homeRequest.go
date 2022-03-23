package requests

type HomeAvtRequest struct {
	StartTime string `json:"startTime" binding:"require"`
	EndTime   string `json:"EndTime" binding:"require"`
}
