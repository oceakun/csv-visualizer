package utilities

import (
	"github.com/spf13/viper"

	"net/http"

	"bytes"

	"fmt"

	"io"
)

func UpdateGrafanaDashboard(){
    viper.SetConfigFile(".env")
    viper.ReadInConfig()
	bearer := viper.Get("BEARER_TOKEN")
	url := "/api/dashboards/db"

	// data to be posted
	data := []byte(`{
		"dashboard": {
		  "id": null,
		  "uid": null,
		  "title": "Production Overview",
		  "tags": [ "templated" ],
		  "timezone": "browser",
		  "schemaVersion": 16,
		  "version": 0,
		  "refresh": "25s"
		},
		"folderId": 0,
		"folderUid": "l3KqBxCMz",
		"message": "Made changes to xyz",
		"overwrite": false
	  }`) 

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(data))
	if err != nil {
		panic(err)
	}

	// adding the request headers
	req.Header.Add("Content-Type", "application/json") 
	req.Header.Add("Accept", "application/json") 
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s.", bearer)) 

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("resp.StatusCode: ", resp.StatusCode)

	// Print the response and body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}
	fmt.Println("Response body:", string(body))
	}