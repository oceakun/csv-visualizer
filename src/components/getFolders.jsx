import React from "react";
import axios from "axios";

function getFolders() {
  axios.get("http://localhost:3000/api/folders?limit=10").then((resp) => {
      console.log("response : ", resp);
  });
  return <div>getFolders</div>;
}

export default getFolders;
//
