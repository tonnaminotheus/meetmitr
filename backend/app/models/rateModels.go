package models

type Rate struct {
	Game    int `json:"game"`
	Anime   int `json:"anime"`
	Charity int `json:"charity"`
	Meme    int `json:"meme"`
	Doujin  int `json:"doujin"`
	Sport   int `json:"sport"`
}
