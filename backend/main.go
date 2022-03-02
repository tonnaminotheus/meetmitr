package main

import (
	"backend/database"
	"backend/router"
)

func main() {
	database.Init()
	router := router.GenerateRouter()
	router.Run()
}
