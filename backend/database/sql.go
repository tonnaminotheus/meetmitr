package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

const (
	address  = "rds-mysql-meetmitr.c3nxpkhzuwh3.us-east-1.rds.amazonaws.com:3306"
	user     = "admin"
	password = "preryusudhod"
	dbName   = "meetmitr"
	protocal = "tcp"
)

var (
	Sql *sql.DB
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
