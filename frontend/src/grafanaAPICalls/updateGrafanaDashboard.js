import axios from "axios";
import {
  currentPanelsArray,
  updatedPanelsArray,
  newPanelID,newDataSourceUID
} from "../store/GrafanaDashboardStore";

export default async function updateDashboard() {

  const $currentPanelsArray = currentPanelsArray.get();
  const $updatedPanelsArray = updatedPanelsArray.get();
  const $newPanelID = newPanelID.get();

  const $newDataSourceUID = newDataSourceUID.get();

  const $fileName = JSON.parse(localStorage.getItem("fileName"));

  const bearerToken = import.meta.env.PUBLIC_BEARER_TOKEN;
  const folderUID = import.meta.env.PUBLIC_FOLDER_UID;
  const dashboardUID = import.meta.env.PUBLIC_DASHBOARD_UID;
  const dashboardTitle = import.meta.env.PUBLIC_DASHBOARD_TITLE;
  const folderTitle = import.meta.env.PUBLIC_FOLDER_TITLE;

  console.log("$newDataSourceUID : ", $newDataSourceUID);
  console.log("$fileName : ", $fileName);
  console.log("$newPanelID : ", $newPanelID);
  console.log("$currentPanelsArray : ", $currentPanelsArray);
  console.log("$updatedPanelsArray : ", $updatedPanelsArray);

  // config for the new panel
  const newPanelConfig = {
    datasource: {
      type: "marcusolsson-csv-datasource",
      uid: $newDataSourceUID,
    },
    fieldConfig: {
      defaults: {
        custom: {
          align: "auto",
          cellOptions: {
            type: "auto",
          },
          inspect: false,
        },
        mappings: [],
        thresholds: {
          mode: "absolute",
          steps: [
            {
              color: "green",
              value: null,
            },
            {
              color: "red",
              value: 80,
            },
          ],
        },
        color: {
          mode: "thresholds",
        },
      },
      overrides: [],
    },
    gridPos: {
      h: 9,
      w: 12,
      x: 0,
      y: 0,
    },
    options: {
      showHeader: true,
      footer: {
        show: false,
        reducer: ["sum"],
        countRows: false,
        fields: "",
      },
    },
    pluginVersion: "9.4.1",
    targets: [
      {
        datasource: {
          type: "marcusolsson-csv-datasource",
          uid: $newDataSourceUID,
        },
        decimalSeparator: ".",
        delimiter: ",",
        header: true,
        ignoreUnknown: false,
        refId: "A",
        schema: [
          {
            name: "",
            type: "string",
          },
        ],
        skipRows: 0,
      },
    ],
    title: $fileName,
    type: "table",
    id: $newPanelID,
  };

  console.log("newPanelConfig : ", newPanelConfig);
  console.log("$currentPanelsArray : ", $currentPanelsArray);
  //   appending the new panel config to the existing panel array and setting the atom corresponding to 'updatedPanelsArray'
  let joinedPanelsArray = [];
  // if ($currentPanelsArray) {
    joinedPanelsArray = [...$currentPanelsArray, newPanelConfig];
  // }
  updatedPanelsArray.set(joinedPanelsArray);

  console.log("joinedPanelsArray : ", joinedPanelsArray);
  console.log("$updatedPanelsArray : ", $updatedPanelsArray);  

  // defining the data to be posted to the dashboard endpoint so as to create a new panel while the others persist
  const data = {
    dashboard: {
      uid: dashboardUID,
      title: dashboardTitle,
      panels: [...$currentPanelsArray, newPanelConfig],
    },
    folderId: 2,
    folderTitle: folderTitle,
    folderUid: folderUID,
    message: "New panel added through API",
    overwrite: true,
  };

  console.log("data for dashboard post API: ", data);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };

  // endpoint for dashboard update
  const url = import.meta.env.PUBLIC_POST_DASHBOARD_URL;

  try {
    const resp = await axios.post(url, data, { headers });
    // handle response
    console.log("dashboard updated with a new panel: ", resp);
  } catch (error) {
    // handle error
    console.error(error);
  }

}
