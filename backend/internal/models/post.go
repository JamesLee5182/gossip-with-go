package models

type Post struct {
	ID        int    `json:"id"`
	PostTitle string `json:"title"`
	Content   string `json:"content"`
	UserId    int    `json:"user_id"`
	TopicId   int    `json:"topic_id"`
	CreatedAt string `json:"created_at"`
	EditedAt  string `json:"edited_at"`
}
