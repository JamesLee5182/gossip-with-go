package topics

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/dataaccess/posts"
	"github.com/CVWO/sample-go-app/internal/dataaccess/topics"
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/pkg/errors"
)

const (
	GetTopic         = "topics.HandleGet"
	ListTopics       = "topics.HandleList"
	ListPostsByTopic = "topics.HandleListPostsByTopic"
	CreateTopic      = "topics.HandleCreate"
	DeleteTopic      = "topics.HandleDelete"

	ErrRetrieveDatabase = "Failed to retrieve database in %s"
	ErrRetrieveTopics   = "Failed to retrieve topics in %s"
	ErrEncodeView       = "Failed to encode topics in %s"
	ErrCreateTopic      = "Failed to create topic in %s"
	ErrGetTopic         = "Failed to get topic in %s"
	ErrGetPosts         = "Failed to get posts of topic in %s"
	ErrCreateReq        = "Invalid create topic request in %s"
	ErrInvalidTopicId   = "Invalid topic Id encountered in %s"
	ErrDeleteTopic      = "Failed to delete topic in %s"

	SuccessfulGetTopicMessage    = "Successfully got topic"
	SuccessfulListTopicsMessage  = "Successfully listed topics"
	SuccessfulListPostsMessage   = "Successfully listed posts"
	SuccessfulCreateTopicMessage = "Successfully created topic"
	SuccessfulDeleteTopicMessage = "Successfully deleted topic"
)

func HandleGet(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidTopicId, GetTopic))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, GetTopic))
	}

	topic, err := topics.Get(db, id)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrGetTopic, GetTopic))
	}

	data, err := json.Marshal(topic)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, ListTopics))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulGetTopicMessage},
	}, nil
}

func HandleList(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	db, err := database.GetDB()

	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, ListTopics))
	}

	topics, err := topics.List(db)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveTopics, ListTopics))
	}

	data, err := json.Marshal(topics)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, ListTopics))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulListTopicsMessage},
	}, nil
}

func HandleListPostsByTopic(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idStr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidTopicId, ListPostsByTopic))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, ListPostsByTopic))
	}

	topicPosts, err := posts.ListByTopic(db, id)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrGetPosts, ListPostsByTopic))
	}

	data, err := json.Marshal(topicPosts)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, ListPostsByTopic))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulListPostsMessage},
	}, nil
}

type CreateTopicRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      int    `json:"user_id"`
}

func HandleCreate(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var req CreateTopicRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateReq, CreateTopic))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, CreateTopic))
	}

	newTopic := models.Topic{
		Title:       req.Title,
		Description: req.Description,
		UserID:      req.UserID,
	}

	createdTopic, err := topics.Create(db, newTopic)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateTopic, CreateTopic))
	}

	data, err := json.Marshal(createdTopic)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, CreateTopic))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulCreateTopicMessage},
	}, nil
}

func HandleDelete(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	idstr := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idstr)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidTopicId, DeleteTopic))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, DeleteTopic))
	}

	if err := topics.Delete(db, id); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrDeleteTopic, DeleteTopic))
	}

	return &api.Response{
		Messages: []string{SuccessfulDeleteTopicMessage},
	}, nil
}
