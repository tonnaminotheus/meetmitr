package main

import (
	"fmt"
	"strconv"
)

func main() {
	s1 := "+10000"
	s2 := "-10000"
	intVar1, err := strconv.Atoi(s1)
	intVar2, err := strconv.Atoi(s2)
	fmt.Println(intVar1, err)
	fmt.Println(intVar2, err)
	fmt.Println(intVar1+intVar2, err)
}
