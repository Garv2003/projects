package models

type GitignoreTemplate struct {
	General    []string            `yaml:"general"`
	Languages  map[string][]string `yaml:"languages"`
	Frameworks map[string][]string `yaml:"frameworks"`
	Ides       map[string][]string `yaml:"ides"`
}

type Form struct {
	Template string `form:"template"`
}
