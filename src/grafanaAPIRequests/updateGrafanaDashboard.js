import axios from "axios";
import {
  currentPanelsArray,
  updatedPanelsArray,
  newPanelID,newDataSourceUID
} from "../store/GrafanaDashboardStore";

export default async function updateDashboard() {
  // const lengthOfArray = (array) => {
  //   let length = 0;
  //   if (array) {
  //     array.map(() => (length = length + 1));
  //   }
  //   return length;
  // };

  const $currentPanelsArray = currentPanelsArray.get();
  const $updatedPanelsArray = updatedPanelsArray.get();
  const $newPanelID = newPanelID.get();
  // const lengthOfCurrentArray = lengthOfArray($currentPanelsArray);
  // newPanelID.set(lengthOfCurrentArray + 1);

  const $newDataSourceUID = newDataSourceUID.get();

  const $fileName = JSON.parse(localStorage.getItem("fileName"));

  const bearerToken = import.meta.env.PUBLIC_BEARER_TOKEN;

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

  //   appending the new panel config to the existing panel array and setting the atom corresponding to 'updatedPanelsArray'
  let joinedPanelsArray = [];
  if ($currentPanelsArray) {
    joinedPanelsArray = [...$currentPanelsArray, newPanelConfig];
  }
  updatedPanelsArray.set(joinedPanelsArray);

  // defining the data to be posted to the dashboard endpoint so as to create a new panel while the others persist
  const data = {
    dashboard: {
      id: 1,
      title: "MyPublicDashboard",
      panels: $updatedPanelsArray,
    },
    folderId: 2,
    folderTitle: "csv-visualizer-dashboard",
    folderUid: "XZJcV2a4k",
    message: "New panel added through API",
    overwrite: true,
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };

  // endpoint for dashboard update
  const url = import.meta.env.PUBLIC_POST_DASHBOARD_URL;

  const updateGrafanaDashboardResponse = await axios
    .post(url, data, { headers })
    .then((resp) => {
      console.log("dashboard updated with a new panel: ", resp);
    })
    .catch((error) => {
      console.error(error);
    });

  return updateGrafanaDashboardResponse;
}
