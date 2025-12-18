package database

import (
	"database/sql"
	"sync"

	_ "modernc.org/sqlite"
)

type Database struct {
	Conn *sql.DB
}

var (
	dbInstance *Database
	once       sync.Once
	dbError    error
)

func GetDB() (*Database, error) {
	once.Do(func() {
		conn, err := sql.Open("sqlite", "./forum.db")
		if err != nil {
			dbError = err
			return
		}

		createTableSQL := `
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`

		_, err = conn.Exec(createTableSQL)
		if err != nil {
			dbError = err
			return
		}

		conn.SetMaxOpenConns(1)

		if err := conn.Ping(); err != nil {
			dbError = err
			return
		}

		dbInstance = &Database{Conn: conn}
	})

	return dbInstance, dbError
}
