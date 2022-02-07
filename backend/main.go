package main

import (
	"backend/database"
	"backend/router"
	"log"
)

func main() {
	errs := database.Init()
	log.Panic(errs)
	router := router.GenerateRouter()
	router.Run()
}
