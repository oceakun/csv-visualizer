import React from "react";
import "./SaveButton.css";
import { useStore } from "@nanostores/react";
import { saveFileData, newFileSaved } from "../../store/SavedFileStore";
import { newPanelID } from "../../store/GrafanaDashboardStore";
import { currentUserUid } from "../../store/UserStore";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import arrowRight from "../../assets/arrowRight.svg";

import { saveButtonDisplayStatus } from "../../store/ComponentsDisplayPropertyStore";

export default function SaveButton() {
  const saveButtonId = useStore(
    saveButtonDisplayStatus
  );
  const $newPanelID = useStore(newPanelID);
  const panelBaseurl = import.meta.env.PUBLIC_SOLO_PANEL_URL;
  const $saveFileData = useStore(saveFileData);
  const $currentUserUid = useStore(currentUserUid);

  const saveUploadedFileDataToFirestore = () => {
    const $savedAt = new Date();
    const $fileName = JSON.parse(
      window.localStorage.getItem("fileName") || "{}"
    );
    const $fileSize = JSON.parse(
      window.localStorage.getItem("fileSize") || "{}"
    );
    const $fileType = JSON.parse(
      window.localStorage.getItem("fileType") || "{}"
    );

    saveFileData.set({
      fileName: $fileName,
      fileSize: $fileSize,
      fileType: $fileType,
      savedAt: $savedAt,
      panelLink: panelBaseurl+$newPanelID,
    });

    if ($currentUserUid) {
      const userCollectionRef = collection(db, $currentUserUid);
      console.log("userCollectionRef : ", userCollectionRef);
      const addFileDocToUserCollection = async (userCollectionRef) => {
        try {
          const docRef = await addDoc(userCollectionRef, $saveFileData);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
  
      addFileDocToUserCollection(userCollectionRef);
      newFileSaved.set(true);
    }
  };

  return (
    <span id={saveButtonId}>
      {" "}
      <img
        id="arrowRight"
        // style={{ rotate: "-10deg" }}
        src={arrowRight}
        width="10"
        alt="arrowRight"
      />
      <button
        id="saveBtn"
        onClick={saveUploadedFileDataToFirestore}
      >
        {" "}
        Save
      </button>
    </span>
  );
}
