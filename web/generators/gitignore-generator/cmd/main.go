package main

import (
	"net/http"

	"github.com/garv2003/gitingore-generator/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()

	engine.StaticFS("/public", http.Dir("public"))
	engine.SetTrustedProxies(nil)

	routes.Routes(engine)

	engine.Run(":8080")
}
