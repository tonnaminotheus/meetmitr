package handlers

import (
	"backend/app/requests"
	"backend/app/responses"
	"backend/database"
	"fmt"

	"github.com/gin-gonic/gin"
)

func GetUserHandler(c *gin.Context) {
	userId := c.Param("userId")

	user, err := userService.FindUserById(userId)
	if err != nil {
		fmt.Print(err.Error())
		c.JSON(400, gin.H{
			"message": "no user with this userId",
		})
		return
	}
	userResp := &responses.GetUserResponse{User: *user}
	userResp.ProfilePicUrl = ""
	userResp.Password = ""
	if userResp.HideGender {
		userResp.Gender = "Unspecified"
	}
	userResp.HideGender = false

	c.JSON(200, userResp)

}

func UpdateUserHandler(c *gin.Context) {
	userId := c.GetString("user_id")

	body := &requests.UpdateUserRequest{}
	err := c.ShouldBindJSON(body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}
	err = userService.UpdateUser(userId, body)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	} else {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	}
}

// CreateVerificationReqHandler create verification request
// @Summary user create verification request
// @Description user create verification request to be verify user
// @Tags user
// @Param Authorization header string false "token of user who make request" default(Bearer <Add access token here>)
// @ID CreateVerificationReqHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} utils.ResponseMessage
// @Failure 400 {object} utils.ResponseMessage
// @Router /api/v1/user/verifRequest [post]
func CreateVerificationReqHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	_, err := database.Sql.Exec("INSERT INTO VeriRequest Values(?)", userId)
	if err != nil {
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "ok",
	})
}

// GetVerificationReqsHandler create verification request
// @Summary admin view all verification requests
// @Description admin want to get all verification requests
// @Tags user
// @Param Authorization header string false "admin token" default(Bearer <Add access token here>)
// @ID GetVerificationReqsHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} responses.GetVerifReqResponse
// @Failure 400 {object} utils.ResponseMessage
// @Router /api/v1/user/verifRequests [get]
func GetVerificationReqsHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	if ok := userService.IsAdmin(userId); !ok {
		c.JSON(400, gin.H{
			"message": "no authority",
		})
		return
	}
	allReq := []responses.GetVerifReqResponse{}
	rows, err := database.Sql.Query(`select u.userId, u.firstName, u.lastName, u.displayPic from 
		User u, VeriRequest v
		where v.userId = u.userId;`)
	if err != nil || rows == nil {
		message := "No request found"
		if err != nil {
			message = err.Error()
		}
		c.JSON(500, gin.H{
			"message": message,
		})
		return
	}
	defer rows.Close()
	for rows.Next() {
		resp := responses.GetVerifReqResponse{}
		rows.Scan(&resp.UserId, &resp.FirstName, &resp.LastName, &resp.DisplayPic)
		allReq = append(allReq, resp)
	}
	c.JSON(200, gin.H{"requests": allReq})
}

// VerifyUserHandler create verification request
// @Summary admin verify or unverify user
// @Description aadmin verify or unverify user
// @Tags user
// @Param Authorization header string false "admin token" default(Bearer <Add access token here>)
// @ID VerifyUserHandler
// @Accept  json
// @Produce  json
// @Param userId path string true "userId of involved user" default(1)
// @Param verify path string true "verification of involved user (1 = verify, 0 = unverify)" default(1)
// @Success 200 {object} utils.ResponseMessage
// @Failure 400 {object} utils.ResponseMessage
// @Router /api/v1/user/verify/{userId}/{verify} [post]
func VerifyUserHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	if ok := userService.IsAdmin(userId); !ok {
		c.JSON(400, gin.H{
			"message": "no authority",
		})
		return
	}
	userId = c.Param("userId")
	verify := (c.Param("verify") == "1")
	if verify {
		_, err := database.Sql.Exec("delete from VeriRequest where userId = ?", userId)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}
		_, err = database.Sql.Exec("Insert into Verified Values(?)", userId)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}
	} else {
		_, err := database.Sql.Exec("delete from VeriRequest where userId = ?", userId)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}
		_, err = database.Sql.Exec("delete from Verified where userId = ?", userId)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
			return
		}
	}
	c.JSON(200, gin.H{
		"message": "ok",
	})

}

func GetIsAdminHandler(c *gin.Context) {
	userId := c.GetString("user_id")
	ok := userService.IsAdmin(userId)
	c.JSON(200, gin.H{
		"isAdmin": ok,
	})
}
