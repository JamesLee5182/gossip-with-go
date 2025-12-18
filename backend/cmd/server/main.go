package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/CVWO/sample-go-app/internal/database"
	"github.com/CVWO/sample-go-app/internal/router"
)

func main() {
	r := router.Setup()
	fmt.Print("Listening on port 8000 at http://localhost:8000!")

	// init database
	db, err := database.GetDB()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Conn.Close() // Cleanup when program exits

	log.Fatalln(http.ListenAndServe(":8000", r))
}
