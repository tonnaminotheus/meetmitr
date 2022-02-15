package main

import (
	"backend/database"
	"backend/router"
	"log"
)

func main() {
	err := database.Init()
	if err != nil {
		log.Panic(err)
	}
	router := router.GenerateRouter()
	router.Run()
}
