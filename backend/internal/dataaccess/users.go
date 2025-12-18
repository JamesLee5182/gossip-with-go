package users

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func List(db *database.Database) ([]models.User, error) {
	rows, err := db.Conn.Query("SELECT id, username, created_at FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Username, &u.CreatedAt); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}

func Create(db *database.Database, username string) error {
	_, err := db.Conn.Exec("INSERT INTO users (username) VALUES (?)", username)
	return err
}
