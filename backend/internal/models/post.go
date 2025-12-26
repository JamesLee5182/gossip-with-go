package models

type Post struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	UserId    int    `json:"user_id"`
	TopicId   int    `json:"topic_id"`
	CreatedAt string `json:"created_at"`
	EditedAt  string `json:"edited_at"`
	Username  string `json:"username"`
	TopicName string `json:"topic_name"`
}
