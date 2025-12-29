package users

import (
	"database/sql"

	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func GetByUsername(db *database.Database, username string) (*models.User, error) {
	var user models.User
	err := db.Conn.QueryRow("SELECT id, username, created_at FROM users WHERE username = ?", username).Scan(
		&user.ID,
		&user.Username,
		&user.CreatedAt,
	)

	// username does not exist
	if err == sql.ErrNoRows {
		return nil, nil
	}

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func List(db *database.Database) ([]models.User, error) {
	rows, err := db.Conn.Query("SELECT id, username, created_at FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []models.User{}
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Username, &u.CreatedAt); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}

func Create(db *database.Database, user models.User) (*models.User, error) {
	query := `
        INSERT INTO users (username) 
        VALUES (?) 
        RETURNING id, username, created_at`

	var newUser models.User
	err := db.Conn.QueryRow(query, user.Username).Scan(
		&newUser.ID,
		&newUser.Username,
		&newUser.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &newUser, nil
}

func Delete(db *database.Database, id int) error {
	_, err := db.Conn.Exec("DELETE FROM users WHERE id = ?", id)
	return err
}
