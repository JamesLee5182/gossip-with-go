package posts

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/dataaccess/comments"
	"github.com/CVWO/sample-go-app/internal/dataaccess/posts"
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/pkg/errors"
)

const (
	GetPost            = "posts.HandleGet"
	ListCommentsByPost = "posts.HandleListCommentsByPost"
	CreatePost         = "posts.HandleCreate"
	DeletePost         = "posts.HandleDelete"

	ErrRetrieveDatabase = "Failed to retrieve database in %s"
	ErrRetrievePosts    = "Failed to retrieve posts in %s"
	ErrEncodeView       = "Failed to encode posts in %s"
	ErrCreatePost       = "Failed to create post in %s"
	ErrGetPost          = "Failed to get post in %s"
	ErrGetComments      = "Failed to get comments in %s"
	ErrInvalidPostId    = "Invalid post id in %s"
	ErrCreateReq        = "Invalid create post request in %s"
	ErrDeletePost       = "Failed to delete post in %s"

	SuccessfulGetPostMessage     = "Successfully got post"
	SuccessfulGetCommentsMessage = "Successfully got comments"
	SuccessfulCreatePostMessage  = "Successfully created post"
	SuccessfulDeletePostMessage  = "Successfully deleted post"
)

type CreatePostRequest struct {
	Title    string `json:"title"`
	Content  string `json:"content"`
	User_id  int    `json:"user_id"`
	Topic_id int    `json:"topic_id"`
}

func HandleGet(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidPostId, GetPost))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, GetPost))
	}

	post, err := posts.Get(db, id)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrGetPost, GetPost))
	}

	data, err := json.Marshal(post)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, GetPost))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulGetPostMessage},
	}, nil
}

func HandleListCommentsByPost(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidPostId, ListCommentsByPost))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, ListCommentsByPost))
	}

	postComments, err := comments.ListByPost(db, id)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrGetComments, ListCommentsByPost))
	}

	data, err := json.Marshal(postComments)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, ListCommentsByPost))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulGetCommentsMessage},
	}, nil
}

func HandleCreate(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var req CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateReq, CreatePost))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, CreatePost))
	}

	newPost := models.Post{
		Title:   req.Title,
		Content: req.Content,
		UserId:  req.User_id,
		TopicId: req.Topic_id,
	}

	createdPost, err := posts.Create(db, newPost)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreatePost, CreatePost))
	}

	data, err := json.Marshal(createdPost)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, CreatePost))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulCreatePostMessage},
	}, nil
}

func HandleDelete(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidPostId, DeletePost))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, DeletePost))
	}

	if err := posts.Delete(db, id); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrDeletePost, DeletePost))
	}

	return &api.Response{
		Messages: []string{SuccessfulDeletePostMessage},
	}, nil
}
