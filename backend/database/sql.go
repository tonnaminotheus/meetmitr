package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

const (
	address  = "meetmitr2.c3nxpkhzuwh3.us-east-1.rds.amazonaws.com:3306"
	dbName   = "meetmitr"
	protocal = "tcp"
)

var (
	user     = os.Getenv("dbUser")
	Sql      *sql.DB
	password = os.Getenv("dbPW")
)

func GetConnString() string {
	return user + ":" + password + "@" + protocal + "(" + address + ")/" + dbName
}

func InitMySql() {
	var err error
	Sql, err = sql.Open("mysql", GetConnString())
	if err != nil {
		log.Fatal(err)
	}
}
