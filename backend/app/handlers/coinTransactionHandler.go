package handlers

import (
	"backend/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func TransactionHandler(c *gin.Context) {
	userId, ok := c.Get("user_id")
	if !ok {
		c.JSON(401, gin.H{
			"message": "invalid token",
		})
		return
	}

	stringVarMoney := c.Param("amount")
	intVarMoney, err1 := strconv.Atoi(stringVarMoney)
	if err1 != nil {
		c.JSON(500, gin.H{
			"message": err1.Error(),
		})
		return
	}
	_, err2 := database.Sql.Query(
		`INSERT INTO CoinTransaction(coinAmount,createdTimeStamp,UserId)
		VALUES (?,CURRENT_TIMESTAMP,?)`, intVarMoney, userId)
	if err2 != nil {
		c.JSON(500, gin.H{
			"message": err2.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})
}
