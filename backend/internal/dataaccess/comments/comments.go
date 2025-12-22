package comments

import (
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
)

func ListByPost(db *database.Database, postId int) ([]models.Comment, error) {
	query := "SELECT id, content, user_id, post_id, created_at, edited_at FROM comments WHERE post_id = ?"
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
			&c.EditedAt); err != nil {
			return nil, err
		}
		comments = append(comments, c)
	}

	return comments, nil
}
