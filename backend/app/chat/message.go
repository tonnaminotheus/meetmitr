package chat

import "time"

type Message struct {
	SenderId int
	Message  string
	DateTime time.Time
}
