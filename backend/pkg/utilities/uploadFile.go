package utilities

import (
	"github.com/gin-gonic/gin"

	"net/http"

	"os"

	"io"
)

func UploadFile(c *gin.Context){
	// extract the file from the request
	file, err := c.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	// open the extracted file 
	inputFile, err := file.Open()
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request")
		return
	}

	// Create the file on disk
	filepath := "/home/oceakun/Desktop/osc/csviz/csv-visualizer/backend/static/" + file.Filename
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
	c.JSON(http.StatusOK, gin.H{"message":"File " + file.Filename + " uploaded successfully"})
}
