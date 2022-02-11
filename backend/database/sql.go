package database

import (
	"database/sql"

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

func Init() error {
	var err error
	Sql, err = sql.Open("mysql", GetConnString())
	return err
}
