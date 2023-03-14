import React from "react";
import axios from "axios";

function updateDashboard() {
  const bearerToken = import.meta.env.PUBLIC_BEARER_TOKEN;

  const jsonData = {
    dashboard: {
      id: 2,
      uid: "XZJcV2a4k",
      title: "my fitness pal data visualized",
      tags: ["trial dashboard"],
      timezone: "browser",
      schemaVersion: 16,
      version: 0,
      refresh: "25s",
    },
    folderId: 2,
    folderUid: "XZJcV2a4k",
    message: "trying out posting requests to the API",
    overwrite: false,
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${ bearerToken }`,
    "Access-Control-Allow-Origin": true
  };

  axios
    .post("http://localhost:3000/api/grafana-proxy/api/dashboards/db", jsonData, { headers })
    .then((resp) => {
      console.log("response : ", resp);
    });
  return <div>updateDashboard</div>;
}

export default updateDashboard;
