import { atom } from "nanostores";

export const currentPanelsArray = atom([]);
export const updatedPanelsArray = atom([]);
export const newPanelID = atom(JSON.parse(localStorage.getItem("newPanelId")));
export const newDataSourceUID = atom();