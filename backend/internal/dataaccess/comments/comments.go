package comments

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func ListByPost(db *database.Database, postId int) ([]models.Comment, error) {
	query := `
		SELECT 
			c.id, 
			c.content, 
			c.user_id, 
			c.post_id, 
			c.created_at, 
			c.edited_at,
			u.username
		FROM comments c 
		JOIN users u ON u.id = c.user_id
		WHERE post_id = ?`
	rows, err := db.Conn.Query(query, postId)

	if err != nil {
		return nil, err
	}

	comments := []models.Comment{}
	for rows.Next() {
		var c models.Comment
		if err := rows.Scan(
			&c.ID,
			&c.Content,
			&c.UserId,
			&c.PostId,
			&c.CreatedAt,
			&c.EditedAt,
			&c.Username); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	return comments, nil
}

func Create(db *database.Database, comment models.Comment) (*models.Comment, error) {
	createQuery := `
		INSERT INTO comments (content, user_id, post_id) 
		VALUES (?, ?, ?)
		RETURNING id, content, user_id, post_id, created_at, edited_at`

	var newComment models.Comment
	err := db.Conn.QueryRow(createQuery, comment.Content, comment.UserId, comment.PostId).Scan(
		&newComment.ID,
		&newComment.Content,
		&newComment.UserId,
		&newComment.PostId,
		&newComment.CreatedAt,
		&newComment.EditedAt,
	)

	if err != nil {
		return nil, err
	}

	userQuery := `
		SELECT username 
		FROM users
		WHERE id = ?`
	err = db.Conn.QueryRow(userQuery, newComment.UserId).Scan(
		&newComment.Username,
	)

	if err != nil {
		return nil, err
	}

	return &newComment, nil
}

func Delete(db *database.Database, id int) error {
	_, err := db.Conn.Exec("DELETE FROM comments WHERE id = ?", id)
	return err
}
