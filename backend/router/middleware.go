package router

import (
	"net/http"

	"backend/app/models"
	"backend/app/services"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	NON_ABORT = 0
	ABORT     = 1
)

var authService = services.NewAuthService()

// AttractAuthMiddleware attract auth middleware
// IS_ABORT will be parameter to tell whether if authorization is failed, it will continue or not
func AttractAuthMiddleware(IS_ABORT int) gin.HandlerFunc {
	return func(c *gin.Context) {
		var all_ok bool = true
		var jwtToken *jwt.Token
		var claims *models.JwtClaims
		var ok bool
		var err error
		var token string
		token, err = authService.GetAuthorizationToken(c)
		if err != nil {
			all_ok = false
			if IS_ABORT == ABORT {
				c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
				c.Abort()
				return
			} else {
				goto MarkDown
			}
		}
		// TODO: extract jwt and set to gin context
		jwtToken, err = authService.VerifyToken(token)
		if err != nil {
			all_ok = false
			if IS_ABORT == ABORT {
				c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
				c.Abort()
				return
			} else {
				goto MarkDown
			}
		}

		claims, ok = jwtToken.Claims.(*models.JwtClaims)

		if !ok {
			all_ok = false
			if IS_ABORT == ABORT {
				c.JSON(http.StatusUnauthorized, gin.H{"message": jwtToken.Claims, "status": "fail"})
				c.Abort()
				return
			} else {
				goto MarkDown
			}
		}
		if !claims.Authorized {
			all_ok = false
			if IS_ABORT == ABORT {
				c.JSON(http.StatusUnauthorized, gin.H{"message": "not an access token"})
				c.Abort()
				return
			} else {
				goto MarkDown
			}
		}

		// authService := auth.NewService()
		// u, err := authService.FindByUserID(claims.UserID)
		// if err != nil {
		// 	c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		// 	c.Abort()
		// 	return
		// }
		if all_ok {
			c.Set("user_id", claims.UserID)
		} else {
			c.Set("user_id", "")
		}
	MarkDown:
		c.Next()
	}
}
