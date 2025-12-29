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
		db, err := sql.Open("sqlite", "./forum.db")
		if err != nil {
			dbError = err
			return
		}

		if _, err := db.Exec("PRAGMA foreign_keys = ON"); err != nil {
			dbError = err
			return
		}

		if err := CreateTables(db); err != nil {
			dbError = err
			return
		}

		db.SetMaxOpenConns(1)

		if err := db.Ping(); err != nil {
			dbError = err
			return
		}

		dbInstance = &Database{Conn: db}
	})

	return dbInstance, dbError
}

func CreateTables(db *sql.DB) error {
	createTables := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);`,

		`CREATE TABLE IF NOT EXISTS topics (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL UNIQUE,
			description TEXT,
			user_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

			FOREIGN KEY (user_id) REFERENCES users(id)
		);`,

		`CREATE TABLE IF NOT EXISTS posts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL UNIQUE,
			content TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			topic_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			edited_at DATETIME DEFAULT CURRENT_TIMESTAMP,

			FOREIGN KEY (user_id) REFERENCES users(id),
			FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
		);`,

		`CREATE TABLE IF NOT EXISTS comments (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			content TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			post_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			edited_at DATETIME DEFAULT CURRENT_TIMESTAMP,

			FOREIGN KEY (user_id) REFERENCES users(id),
			FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
		);`,
	}

	for _, sql := range createTables {
		if _, err := db.Exec(sql); err != nil {
			return err
		}
	}

	return nil
}
