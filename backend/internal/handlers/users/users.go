package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/dataaccess/users"
	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/models"
	"github.com/pkg/errors"
)

const (
	LoginUser  = "users.HandleLogin"
	ListUsers  = "users.HandleList"
	CreateUser = "users.HandleCreate"

	ErrRetrieveDatabase    = "Failed to retrieve database in %s"
	ErrRetrieveUsers       = "Failed to retrieve users in %s"
	ErrEncodeView          = "Failed to encode users in %s"
	ErrCreateUser          = "Failed to create user in %s"
	ErrInvalidLoginRequest = "Invalid login request in %s"

	SuccessfulLoginUserMessage  = "Successfully logged in user"
	SuccessfulListUsersMessage  = "Successfully listed users"
	SuccessfulCreateUserMessage = "Successfully created user"
)

type LoginRequest struct {
	Username string `json:"username"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrInvalidLoginRequest, LoginUser))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, LoginUser))
	}

	user, err := users.GetByUsername(db, req.Username)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveUsers, LoginUser))
	}

	// create new user
	if user == nil {
		var newUser = models.User{
			Username: req.Username,
		}

		user, err = users.Create(db, newUser)
		if err != nil {
			return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateUser, LoginUser))
		}
	}

	data, err := json.Marshal(user)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, LoginUser))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulLoginUserMessage},
	}, nil
}

func HandleList(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, ListUsers))
	}

	users, err := users.List(db)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveUsers, ListUsers))
	}

	data, err := json.Marshal(users)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, ListUsers))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulListUsersMessage},
	}, nil
}

type CreateUserRequest struct {
	Username string `json:"username"`
}

func HandleCreate(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var req CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateUser, CreateUser))
	}

	db, err := database.GetDB()
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrCreateUser, CreateUser))
	}

	newUser := models.User{
		Username: req.Username,
	}

	createdUser, err := users.Create(db, newUser)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, CreateUser))
	}

	data, err := json.Marshal(createdUser)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, CreateUser))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulCreateUserMessage},
	}, nil
}
