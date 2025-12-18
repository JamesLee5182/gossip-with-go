package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/CVWO/sample-go-app/internal/api"
	"github.com/CVWO/sample-go-app/internal/handlers/users"
	"github.com/go-chi/chi/v5"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Post("/users", Wrap(users.Create))
		r.Get("/users", Wrap(users.List))
	}
}

type Handler func(w http.ResponseWriter, r *http.Request) (*api.Response, error)

func Wrap(h Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		response, err := h(w, req)

		if err != nil {
			fmt.Printf("[API Error] %s %s: %v\n", req.Method, req.URL.Path, err)

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
		}

		w.WriteHeader(http.StatusOK)

		if response != nil {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		}
	}
}
