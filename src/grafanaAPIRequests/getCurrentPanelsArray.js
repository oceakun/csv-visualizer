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

  const getCurrentPanelsArrayResponse = await axios
    .get(url)
    .then((resp) => {
      console.log("getdashboard response : ", resp);
      currentPanelsArray.set(resp.data.dashboard.panels);
      const lengthOfCurrentArray = lengthOfArray($currentPanelsArray);
      newPanelID.set(lengthOfCurrentArray + 1);
      console.log("dashboard fetched : ", $currentPanelsArray);
    })
    .catch((error) => {
      console.error(error);
    });

  console.log("currentPanelsArray : ", $currentPanelsArray);

  return getCurrentPanelsArrayResponse;
}
