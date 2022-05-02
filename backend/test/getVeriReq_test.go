package test

import (
	"database/sql"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/magiconair/properties/assert"
)

const (
	address  = "meetmitr2.c3nxpkhzuwh3.us-east-1.rds.amazonaws.com:3306"
	user     = "admin"
	password = "preryusudhod"
	dbName   = "meetmitr"
	protocal = "tcp"
)

func GetConnString() string {
	return user + ":" + password + "@" + protocal + "(" + address + ")/" + dbName
}

func init() {
	/// connect database
	var err error
	Sql, err = sql.Open("mysql", GetConnString())
	if err != nil {
		log.Fatal(err)
	}
}

type VeriTestcase struct {
	AdminID      string
	UserID       string
	Verify       string
	ResponseCode int
}

var VeriTestcases = []VeriTestcase{
	{"2", "", "1", 401},
	{"1", "10", "1", 400},
	{"1", "4", "1", 400},
	{"1", "10", "0", 400},
	{"1", "2", "0", 400},
	{"1", "3", "1", 200},
}

func TestVerify(t *testing.T) {
	for id, testcase := range VeriTestcases {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		c.Request = &http.Request{
			Header: make(http.Header),
		}
		c.Request.Method = "POST" // or PUT
		c.Request.Header.Set("Content-Type", "application/json")
		//c.Request.Header.Set("Authorization", "Bearer "+testcase.AdminToken)
		c.Params = []gin.Param{
			{
				Key:   "user_id",
				Value: testcase.AdminID,
			},
			{
				Key:   "userId",
				Value: testcase.UserID,
			},
			{
				Key:   "verify",
				Value: testcase.Verify,
			},
		}
		VerifyUserHandler(c)

		assert.Equal(t, w.Code, testcase.ResponseCode)
		log.Printf("case ID: %d\n", id+1)
	}
}
