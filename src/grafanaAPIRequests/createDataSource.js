import axios from "axios";
import { newDataSourceUID } from "../store/GrafanaDashboardStore";

export default async function createNewDataSource() {
  const bearerToken = import.meta.env.PUBLIC_BEARER_TOKEN;

  const $fileName = JSON.parse(localStorage.getItem("fileName"));
  const dataSourceName = `CSV-${$fileName}`;
  const dataSourceBaserl = import.meta.env.PUBLIC_DATASOURCE_STATIC_FILE_URL;
  const dataSourceUrl = dataSourceBaserl + $fileName;

  const url = import.meta.env.PUBLIC_POST_DATASOURCE_URL;

  const data = {
    name: dataSourceName,
    type: "marcusolsson-csv-datasource",
    url: dataSourceUrl,
    access: "proxy",
    basicAuth: false,
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };

  const createDataSourceResponse = await axios
    .post(url, data, { headers })
    .then((resp) => {
      newDataSourceUID.set(resp.data.datasource.uid);
      console.log("new Data-Source created : ", resp);
    })
    .catch((error) => {
      console.error(error);
    });

  return createDataSourceResponse;
}
