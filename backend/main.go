package main

import (
	"backend/database"
	"backend/router"
	"log"
)

func main() {
	errs := database.Init()
	if errs != nil {
		log.Panic(errs)
	}
	router := router.GenerateRouter()
	router.Run()
}
