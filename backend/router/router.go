package router

import (
	"backend/app/handlers"
	"io/ioutil"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
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
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.POST("/api/v1/register", handlers.RegisterHandler)
	router.POST("/api/v1/activate/:activStr", handlers.ActivateUserHandler)
	router.POST("/api/v1/login", handlers.LoginHandler)
	router.POST("/api/v1/loginVerif/:loginKey", handlers.LoginVerifHandler)
	router.GET("/api/v1/user/:userId", handlers.GetUserHandler)
	router.PUT("/api/v1/user", AttractAuthMiddleware(ABORT), handlers.UpdateUserHandler)
	router.POST("/api/v1/user/veriRequest", AttractAuthMiddleware(ABORT), handlers.CreateVerificationReqHandler)
	router.GET("/api/v1/veriRequests", AttractAuthMiddleware(ABORT), handlers.GetVerificationReqsHandler)
	router.POST("/api/v1/verify/:userId/:verify", AttractAuthMiddleware(ABORT), handlers.VerifyUserHandler)
	router.GET("/api/v1/isAdmin", AttractAuthMiddleware(ABORT), handlers.GetIsAdminHandler)
	// EventHandler
	v1Event := router.Group("/api/v1/event")
	{
		v1Event.DELETE("/:eventId", AttractAuthMiddleware(ABORT), handlers.DeleteEventHandler)
		v1Event.GET("/descriptions/:eventId", AttractAuthMiddleware(ABORT), handlers.GetEventDescHandler)
		v1Event.GET("/tags", handlers.GetEventTagsHandler)

		v1Event.PUT("/update/:eventId", AttractAuthMiddleware(ABORT), handlers.UpdateEventHandler)

		v1Event.POST("/join/:eventId", AttractAuthMiddleware(ABORT), handlers.JoinEventHandler)
		v1Event.POST("/create", AttractAuthMiddleware(ABORT), handlers.CreateEventHandler)

		v1Event.DELETE("/unjoin/:eventId", AttractAuthMiddleware(ABORT), handlers.UnjoinEventHandler)
	}
	// ChatHandler
	v1Chat := router.Group("/api/v1/chat")
	{
		v1Chat.GET("/token/:chatType/:otherId", AttractAuthMiddleware(ABORT), handlers.GetChatTokenHandler)
		v1Chat.GET("/partners", AttractAuthMiddleware(ABORT), handlers.GetChatPartners)
		v1Chat.GET("/history/dm/:chatId", AttractAuthMiddleware(ABORT), handlers.GetDMHistoryHandlers)
		v1Chat.GET("/room/:token", handlers.GetChatRoomHandler)
	}

	//CoinTransactionHandler
	router.POST("/api/v1/transaction/:amount", AttractAuthMiddleware(ABORT), handlers.TransactionHandler)

	//HomeHandler
	router.POST("/api/v1/home/avt/:numPage", AttractAuthMiddleware(ABORT), handlers.HomeWithAvtHandler)
	router.GET("/api/v1/home/:numPage", AttractAuthMiddleware(ABORT), handlers.HomeHandler)
	router.POST("/api/v1/rate", AttractAuthMiddleware(ABORT), handlers.RateHandler)
	router.GET("/api/v1/rate", AttractAuthMiddleware(ABORT), handlers.GetRateHandler)

	router.POST("/api/v1/upload", AttractAuthMiddleware(ABORT), handlers.UploadFileHandler)

	//quiz
	router.GET("/api/v1/quiz", AttractAuthMiddleware(ABORT), handlers.GetQuizHandler)
	router.POST("/api/v1/quiz", AttractAuthMiddleware(ABORT), handlers.SendQuizHandler)

	//Noti
	router.GET("/api/v1/noti/getAll", AttractAuthMiddleware(ABORT), handlers.NotiHandler)
	router.GET("/api/v1/noti/getCount", AttractAuthMiddleware(ABORT), handlers.NotiCountHandler)

	return router
}
