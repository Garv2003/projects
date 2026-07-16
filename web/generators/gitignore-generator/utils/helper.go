package utils

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func GetGitignoreContent(template string) (string, error) {
	template = strings.ToLower(template)

	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	gitignoreFiles := map[string]string{
		"go":     "utils/gitignores/Go.gitignore",
		"python": "utils/gitignores/Python.gitignore",
		"node":   "utils/gitignores/Node.gitignore",
		"java":   "utils/gitignores/Java.gitignore",
		"react":  "utils/gitignores/React.gitignore",
	}

	if filePath, exists := gitignoreFiles[template]; exists {
		fullPath := filepath.Join(cwd, filePath)

		if content, err := ioutil.ReadFile(fullPath); err == nil {
			return string(content), nil
		} else {
			return "", fmt.Errorf("Error reading file: %v", err)
		}
	}

	return "", fmt.Errorf("No matching .gitignore file found")
}
