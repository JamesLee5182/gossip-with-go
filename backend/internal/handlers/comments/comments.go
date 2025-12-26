package comments

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/dataaccess/comments"
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
	"github.com/pkg/errors"
)

const (
	CreateComment = "comments.HandleCreate"

	ErrRetrieveDatabase = "Failed to retrieve database in %s"
	ErrRetrieveComments = "Failed to retrieve comments in %s"
	ErrEncodeView       = "Failed to encode comments in %s"
	ErrCreateComment    = "Failed to create comment in %s"
	ErrGetComment       = "Failed to get comment in %s"
	ErrCreateReq        = "Invalid create comment request in %s"

	SuccessfulCreateCommentMessage = "Successfully created comment"
)

type CommentCreateRequest struct {
	Content string `json:"content"`
	UserID  int    `json:"user_id"`
	PostID  int    `json:"post_id"`
}

func HandleCreate(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var req CommentCreateRequest
	if err := json.NewDecoder(r.Body).Decode((&req)); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateReq, CreateComment))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, CreateComment))
	}

	newComment := models.Comment{
		Content: req.Content,
		UserId:  req.UserID,
		PostId:  req.PostID,
	}

	createdComment, err := comments.Create(db, newComment)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateComment, CreateComment))
	}

	data, err := json.Marshal(createdComment)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, CreateComment))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulCreateCommentMessage},
	}, nil
}
