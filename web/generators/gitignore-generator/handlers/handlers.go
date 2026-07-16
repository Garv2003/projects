package handlers

import (
	"fmt"
	"net/http"

	"github.com/garv2003/gitingore-generator/models"
	"github.com/garv2003/gitingore-generator/utils"
	"github.com/garv2003/gitingore-generator/views/pages"
	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	c.HTML(http.StatusOK, "", pages.Home())
}

func Gitignore(c *gin.Context) {
	var query models.Form
	if err := c.Bind(&query); err != nil {
		fmt.Println("Error binding form data:", err)
		c.HTML(http.StatusOK, "", pages.Gitignore("", "Error binding form data"))
		return
	}

	result, err := utils.GetGitignoreContent(query.Template)
	if err != nil {
		fmt.Println("Error getting .gitignore content:", err)
		c.HTML(http.StatusOK, "", pages.Gitignore("", err.Error()))
		return
	}

	c.HTML(http.StatusOK, "", pages.Gitignore(result, ""))
}
