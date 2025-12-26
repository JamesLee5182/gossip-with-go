package posts

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func Get(db *database.Database, postId int) (*models.Post, error) {
	query := `
		SELECT 
			p.id, 
			p.title, 
			p.content, 
			p.user_id, 
			p.topic_id, 
			p.created_at, 
			p.edited_at,
			u.username,
			t.title 
		FROM posts p
		JOIN users u ON u.id = p.user_id
		JOIN topics t ON t.id = p.topic_id
		WHERE p.id = ?`

	var post models.Post
	err := db.Conn.QueryRow(query, postId).Scan(
		&post.ID,
		&post.Title,
		&post.Content,
		&post.UserId,
		&post.TopicId,
		&post.CreatedAt,
		&post.EditedAt,
		&post.Username,
		&post.TopicName,
	)

	if err != nil {
		return nil, err
	}

	return &post, nil
}

func ListByTopic(db *database.Database, topicId int) ([]models.Post, error) {
	query := `
		SELECT 
			p.id, 
			p.title, 
			p.content, 
			p.user_id, 
			p.topic_id, 
			p.created_at, 
			p.edited_at,
			u.username,
			t.title 
		FROM posts p
		JOIN users u ON u.id = p.user_id
		JOIN topics t ON t.id = p.topic_id
		WHERE topic_id = ?`
	rows, err := db.Conn.Query(query, topicId)

	if err != nil {
		return nil, err
	}

	posts := []models.Post{}
	for rows.Next() {
		var p models.Post
		if err := rows.Scan(
			&p.ID,
			&p.Title,
			&p.Content,
			&p.UserId,
			&p.TopicId,
			&p.CreatedAt,
			&p.EditedAt,
			&p.Username,
			&p.TopicName); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}

	return posts, nil
}

func Create(db *database.Database, post models.Post) (*models.Post, error) {
	createQuery := `
		INSERT INTO posts (title, content, user_id, topic_id) 
		VALUES (?, ?, ?, ?)
		RETURNING id, title, content, user_id, topic_id, created_at, edited_at`

	var newPost models.Post
	err := db.Conn.QueryRow(createQuery, post.Title, post.Content, post.UserId, post.TopicId).Scan(
		&newPost.ID,
		&newPost.Title,
		&newPost.Content,
		&newPost.UserId,
		&newPost.TopicId,
		&newPost.CreatedAt,
		&newPost.EditedAt,
	)

	if err != nil {
		return nil, err
	}

	query := `
		SELECT u.username, t.title
		FROM users u, topics t
		WHERE u.id = ? AND t.id = ?`

	err = db.Conn.QueryRow(query, newPost.UserId, newPost.TopicId).Scan(
		&newPost.Username,
		&newPost.TopicName,
	)

	if err != nil {
		return nil, err
	}

	return &newPost, nil
}
