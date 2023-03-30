import { atom } from "nanostores";

export const saveFileData = atom({
    fileName: "",
    fileSize: "",
    fileType: "",
    savedAt: "",
    panelLink:""
});

export const newFileSaved = atom()