package test

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var (
	Sql *sql.DB
)

type GetVerifReqResponse struct {
	UserId     int    `json:"userId" example:"5"`
	FirstName  string `json:"firstName" example:"Jade"`
	LastName   string `json:"lastName" example:"Piromsopee"`
	DisplayPic string `json:"displayPic" example:"example.com"`
}

func IsAdmin(userId string) bool {
	var adminId string
	err := Sql.QueryRow("Select adminId from Admin where userId = ?", userId).Scan(&adminId)
	return err == nil
}

func ErrorCheck(b bool, res sql.Result) bool {
	if b {
		count, err := res.RowsAffected()
		if err == nil {
			if count == 0 {
				return true
			}
		}
	}
	return false
	
}

func VerifyUserHandler(c *gin.Context) {
	userId := c.Param("user_id")
	if ok := IsAdmin(userId); !ok {
		c.JSON(401, gin.H{
			"message": "no authority",
		})
		return
	}
	userId = c.Param("userId")
	verify := (c.Param("verify") == "1")
	if verify {
		res, err := Sql.Exec("delete from VeriRequest where userId = ?", userId)
		if ErrorCheck(err == nil, res) {
			c.JSON(400, gin.H{
				"message": "no verification request",
			})
			return
		}
		_, err = Sql.Exec("Insert into Verified Values(?)", userId)
		if err != nil {
			c.JSON(400, gin.H{
				"message": "already verified",
			})
			return
		}
	} else {
		res, err := Sql.Exec("delete from VeriRequest where userId = ?", userId)
		if ErrorCheck(err == nil, res) {
			c.JSON(400, gin.H{
				"message": "no verification request",
			})
			return
		}
		res, err = Sql.Exec("delete from Verified where userId = ?", userId)
		if ErrorCheck(err == nil, res) {
			c.JSON(400, gin.H{
				"message": "user is not verfied yet",
			})
			return
		}
	}
	c.JSON(200, gin.H{
		"message": "ok",
	})

}
