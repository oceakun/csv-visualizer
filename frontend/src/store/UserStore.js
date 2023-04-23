import { atom } from "nanostores";
export const currentUserUid = atom(""); 
export const userEmail = atom(""); 
export const confirmedPassword = atom(""); 
export const filesfetchedFromFirestore = atom([
    {
      id:"--",
      fileName: "--",
      fileSize: "--",
      fileType: "--",
      savedAt: "--",
      panelLink: "--",
    },
  ]); 
