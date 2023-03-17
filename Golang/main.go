package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"fmt"

	"github.com/oceakun/csv-visualizer/Golang/pkg/utilities"

	"sync"
)

func main(){

	 // initialize a reverse proxy and pass the actual backend server url here
	//  proxy, err := utilities.NewProxy("http://localhost:8000")
	//  if err != nil {
	// 	 panic(err)
	//  }

	router := gin.Default()

	var waitGroup sync.WaitGroup

	waitGroup.Add(1)
	go func() {
		defer waitGroup.Done()
		// setting up the router for file POST request
		router.POST("/api/upload", utilities.UploadFile)
		if err:= http.ListenAndServe(":8080", router); err!= nil {
			panic(err)	
		}
	}()

	// waitGroup.Add(1)
	// go func() {
	// 	defer waitGroup.Done()

	// 	// start reverse-proxy server
	// 	http.HandleFunc("/reverse-proxy", utilities.HandleRequestAndRedirect)
	// 	if err := http.ListenAndServe(":1330", nil); err != nil {
	// 		panic(err)
	// 	}
	// }()

	waitGroup.Add(1)
	go func() {
		defer waitGroup.Done()

		// serving static files
		myDir := http.Dir("./static")
		fmt.Printf("myDir type: %T",myDir);
		myHandler := http.FileServer(myDir)
		http.Handle("/", myHandler)
		if err:= http.ListenAndServe(":8081", nil); err != nil {
			panic(err)
		}
	}()

	
	waitGroup.Wait()
	
	}
	