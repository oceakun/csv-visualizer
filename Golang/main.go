package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/spf13/viper"

	"fmt"

	"github.com/oceakun/csv-visualizer/Golang/pkg/utilities"

	"sync"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {

        c.Header("Access-Control-Allow-Origin", "*")
        c.Header("Access-Control-Allow-Credentials", "true")
        c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

func main(){

	router := gin.Default()
	router.Use(CORSMiddleware())

    viper.SetConfigFile(".env")
    viper.ReadInConfig()
	fileUploadPort := ":" + viper.Get("FILE_UPLOAD_PORT").(string)
	staticServerPort := ":" + viper.Get("STATIC_SERVER_PORT").(string)

	var waitGroup sync.WaitGroup

	waitGroup.Add(1)
	go func() {
		defer waitGroup.Done()
		// setting up the router for file POST request
		router.POST("/api/upload", utilities.UploadFile)
		if err:= http.ListenAndServe(fileUploadPort, router); err!= nil {
			panic(err)	
		}
	}()

	waitGroup.Add(1)
	go func() {
		defer waitGroup.Done()
		// serving static files
		myDir := http.Dir("./static")
		fmt.Printf("myDir type: %T",myDir);
		myHandler := http.FileServer(myDir)
		http.Handle("/", myHandler)
		if err:= http.ListenAndServe(staticServerPort, nil); err != nil {
			panic(err)
		}
	}()

	waitGroup.Wait()
	
	}
	