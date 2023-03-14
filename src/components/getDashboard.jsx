import React from "react";
import axios from "axios";

function getDashboard() {
  axios.get("http://localhost:3000/api/dashboards/uid/XZJcV2a4k").then((resp) => {
    console.log("response : ", resp);
  });
  return <div>updateDashboard</div>;
}

export default getDashboard;