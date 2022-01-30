package main

import "backend/router"

func main() {
	router := router.GenerateRouter()
	router.Run()
}
