import { atom } from "nanostores";

export const uploadedFileName = atom(""); // updated from the db
export const uploadedFileSize = atom(""); // updated from the db
export const uploadedFileUploadDate = atom(""); // updated from the db
export const uploadedFileLastModified = atom(""); // updated from the db
export const uploadedFileType = atom(""); // updated from the db
export const uploadFileData = atom({
    fileName: "",
    fileSize: "",
    fileType: "",
    uploadedAt: "",
    lastModified:""
});