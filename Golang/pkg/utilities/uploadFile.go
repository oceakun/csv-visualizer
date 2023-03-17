package utilities

import (
	"github.com/gin-gonic/gin"
	
	"net/http"

	"os"

	"io"
)

func UploadFile(c *gin.Context){
	// Get the file from the request
	file, err := c.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	// open the file of type  
	inputFile, err := file.Open()
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	// Create the file on disk
	filepath := "D:/Personal Projects/Golang/static/visualizationData.csv"
	dst, err := os.Create(filepath)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error creating file")
		return
	}
	defer dst.Close()

	// Copy the file from the request to the destination file
	if _, err := io.Copy(dst, inputFile); 
	err != nil {
		c.String(http.StatusInternalServerError, "Error copying file")
		return
	}

	// Return a success message
	c.String(http.StatusOK, "File %s uploaded successfully", file.Filename)
}
