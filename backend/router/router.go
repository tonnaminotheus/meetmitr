package router

import (
	"backend/app/handlers"
	"io/ioutil"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	// swagger embed files
)

// GenerateRouter generate router
func GenerateRouter() *gin.Engine {
	router := gin.New()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST, GET, PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"},
		MaxAge:       12 * time.Hour,
	}))

	httpLog := logrus.New()
	if env := os.Getenv("GO_ENV"); env == "test" {
		httpLog.SetOutput(ioutil.Discard)
	} else {
		httpLog.SetOutput(os.Stdout)
	}

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"message": "Page not found."})
	})

	router.POST("/api/v1/register", handlers.RegisterHandler)
	router.GET("/api/v1/event/desciptions", handlers.GetEventDescHandler)
	router.GET("/api/v1/event/tags", handlers.GetEventTagsHandler)
	router.PUT("/api/v1/event/update", AttractAuthMiddleware(ABORT), handlers.PutEventHandler)
	router.POST("/api/v1/activate/:activStr", handlers.ActivateUserHandler)
	router.POST("/login", handlers.LoginHandler)
	return router
}
