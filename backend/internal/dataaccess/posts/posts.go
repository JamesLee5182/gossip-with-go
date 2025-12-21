package posts

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func ListByTopic(db *database.Database, topicId int) ([]models.Post, error) {
	query := "SELECT id, title, content, user_id, topic_id, created_at, edited_at FROM posts WHERE topic_id = ?"
	rows, err := db.Conn.Query(query, topicId)

	if err != nil {
		return nil, err
	}

	posts := []models.Post{}
	for rows.Next() {
		var p models.Post
		if err := rows.Scan(
			&p.ID,
			&p.PostTitle,
			&p.Content,
			&p.UserId,
			&p.TopicId,
			&p.CreatedAt,
			&p.EditedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}
