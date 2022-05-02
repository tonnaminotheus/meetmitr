package main

import (
	"backend/database"
	"backend/router"
)

// @title linkedist
// @version 1.0
// @description application description

// @schemes https http

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	database.Init()
	router := router.GenerateRouter()
	router.Run()
}
