const axios = require("axios");

const config = {
    headers:{
      "Accept": "application/json",
        "Content-Type": "application/json",
      "Authorization": "Bearer eyJrIjoiT0tTcG1pUlY2RnVKZTFVaDFsNFZXdE9ZWmNrMkZYbk"
    }
};
  
  const url = "http://localhost:8080//api/dashboards/db";

  const data ={
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
  }
  
  axios.post(url, data, config)
  .then(res => console.log(res))
    .catch(err => console.log(err))
  
    