package routes

import (
	"github.com/garv2003/gitingore-generator/handlers"
	"github.com/garv2003/gitingore-generator/templrender"
	"github.com/gin-gonic/gin"
)

func Routes(engine *gin.Engine) {
	ginHtmlRenderer := engine.HTMLRender
	engine.HTMLRender = &templrender.HTMLTemplRenderer{FallbackHtmlRenderer: ginHtmlRenderer}

	engine.GET("/", handlers.Home)
	engine.POST("/gitignore", handlers.Gitignore)

}
