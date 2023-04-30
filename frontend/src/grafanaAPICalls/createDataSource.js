import axios from "axios";
import { newDataSourceUID } from "../store/GrafanaDashboardStore";
import { v4 as uuidv4 } from 'uuid';

export default async function createNewDataSource() {
  const bearerToken = import.meta.env.PUBLIC_BEARER_TOKEN;

  const $fileName = JSON.parse(localStorage.getItem("fileName"));
  const dataSourceName = `CSV-${$fileName}-${uuidv4()}`;
  const dataSourceBaseUrl = import.meta.env.PUBLIC_DATASOURCE_STATIC_FILE_URL;
  const dataSourceUrl = dataSourceBaseUrl + $fileName;

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

  try {
    const resp = await axios.post(url, data, { headers });
    // handle response
    newDataSourceUID.set(resp.data.datasource.uid);
    console.log("new Data-Source created : ", resp);
  } catch (error) {
    // handle error
    console.error(error);
  }

}
