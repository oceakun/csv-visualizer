import axios from "axios";
import { currentPanelsArray, newPanelID } from "../store/GrafanaDashboardStore";

export default async function getDashboard() {
  const $currentPanelsArray = currentPanelsArray.get();
  const url = import.meta.env.PUBLIC_GET_DASHBOARD_BY_ID_URL;

  const lengthOfArray = (array) => {
    let length = 0;
    if (array) {
      array.map(() => (length = length + 1));
    }
    return length;
  };

  try {
    const resp = await axios.get(url);
    // handle response
    console.log(resp.data);
    console.log("getdashboard response : ", resp);
    currentPanelsArray.set(resp.data.dashboard.panels);
    const lengthOfCurrentArray = lengthOfArray($currentPanelsArray);
    localStorage.setItem("newPanelId", JSON.stringify(lengthOfCurrentArray + 1));
    newPanelID.set( JSON.parse(localStorage.getItem("newPanelId")));
    console.log("newPanelID : ", newPanelID.get());
    console.log("dashboard fetched : ", $currentPanelsArray);
  } catch (error) {
    // handle error
    console.error(error);
  }
  
}
