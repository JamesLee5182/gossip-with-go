package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/handlers/comments"
	"github.com/CVWO/sample-go-app/internal/handlers/posts"
	"github.com/CVWO/sample-go-app/internal/handlers/topics"
	"github.com/CVWO/sample-go-app/internal/handlers/users"
	"github.com/go-chi/chi/v5"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Post("/login", Wrap(users.HandleLogin))
		r.Post("/users", Wrap(users.HandleCreate))
		r.Get("/users", Wrap(users.HandleList))

		r.Get("/topics", Wrap(topics.HandleList))
		r.Post("/topics", Wrap(topics.HandleCreate))
		r.Get("/topics/{id}", Wrap(topics.HandleGet))
		r.Get("/topics/{id}/posts", Wrap(topics.HandleListPostsByTopic))
		r.Delete("/topics/{id}", Wrap(topics.HandleDelete))

		r.Get("/posts/{id}", Wrap(posts.HandleGet))
		r.Get("/posts/{id}/comments", Wrap(posts.HandleListCommentsByPost))
		r.Post("/posts", Wrap(posts.HandleCreate))
		r.Delete("/posts/{id}", Wrap(posts.HandleDelete))

		r.Post("/comments", Wrap(comments.HandleCreate))
		r.Delete("/comments/{id}", Wrap(comments.HandleDelete))
	}
}

type Handler func(w http.ResponseWriter, r *http.Request) (*api.Response, error)

func Wrap(h Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		response, err := h(w, req)

		if err != nil {
			fmt.Printf("[API Error] %s %s: %v\n", req.Method, req.URL.Path, err)

			w.Header().Set("Content-Type", "application/json")
		}

		w.WriteHeader(http.StatusOK)

		if response != nil {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		}
	}
}
