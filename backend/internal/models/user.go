package models

import "fmt"

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	CreatedAt string `json:"created_at"`
}

func (user *User) Greet() string {
	return fmt.Sprintf("Hello, I am %s", user.Username)
}
