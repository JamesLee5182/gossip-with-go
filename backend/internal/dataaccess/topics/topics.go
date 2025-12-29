package topics

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func Get(db *database.Database, id int) (*models.Topic, error) {
	var topic models.Topic
	err := db.Conn.QueryRow("SELECT id, title, description, user_id, created_at FROM topics WHERE id = ?", id).Scan(
		&topic.ID,
		&topic.Title,
		&topic.Description,
		&topic.UserID,
		&topic.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &topic, nil
}

func List(db *database.Database) ([]models.Topic, error) {
	rows, err := db.Conn.Query("SELECT id, title, description, user_id, created_at FROM topics")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	topics := []models.Topic{}
	for rows.Next() {
		var t models.Topic
		if err := rows.Scan(&t.ID, &t.Title, &t.Description, &t.UserID, &t.CreatedAt); err != nil {
			return nil, err
		}
		topics = append(topics, t)
	}

	return topics, nil
}

func Create(db *database.Database, topic models.Topic) (*models.Topic, error) {
	query := `
		INSERT INTO topics (title, description, user_id) 
		VALUES (?, ?, ?)
		RETURNING id, title, description, user_id, created_at`

	var newTopic models.Topic
	err := db.Conn.QueryRow(query, topic.Title, topic.Description, topic.UserID).Scan(
		&newTopic.ID,
		&newTopic.Title,
		&newTopic.Description,
		&newTopic.UserID,
		&newTopic.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &newTopic, nil
}

func Delete(db *database.Database, id int) error {
	_, err := db.Conn.Exec("DELETE FROM topics WHERE id = ?", id)
	return err
}
