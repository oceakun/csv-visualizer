import React from "react";
import "./SaveButton.css";
import { useStore } from "@nanostores/react";
import { newFileSaved } from "../../store/SavedFileStore";
import { newPanelID } from "../../store/GrafanaDashboardStore";
import { currentUserUid } from "../../store/UserStore";
import { db } from "../../firebase";
import {
  collection,
  addDoc
} from "firebase/firestore";
import arrowRight from "../../assets/arrowRight.svg";

import { saveButtonDisplayStatus } from "../../store/ComponentsDisplayPropertyStore";

export default function SaveButton() {
  const saveButtonId = useStore(saveButtonDisplayStatus);
  const $newPanelID = useStore(newPanelID);
  const panelBaseurl = import.meta.env.PUBLIC_SOLO_PANEL_URL;
  const $currentUserUid = useStore(currentUserUid);
  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dev",
  ];

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

    const fileDataToBeSaved = {
      fileName: $fileName,
      fileSize: $fileSize,
      fileType: $fileType,
      savedAt: `${
        monthsArray[$savedAt.getMonth()]
      },${$savedAt.getDate()},${$savedAt.getFullYear()} at ${$savedAt.getHours()}:${$savedAt.getMinutes()}:${$savedAt.getSeconds()} `,
      panelLink: panelBaseurl + $newPanelID,
    };

    if ($currentUserUid) {
      const userCollectionRef = collection(db, $currentUserUid);
      console.log("userCollectionRef : ", userCollectionRef);
      const addFileDocToUserCollection = async (userCollectionRef) => {
        try {
          const docRef = await addDoc(userCollectionRef, fileDataToBeSaved);
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
      <img id="arrowRight" src={arrowRight} width="10" alt="arrowRight" />
      <button id="saveBtn" onClick={saveUploadedFileDataToFirestore}>
        {" "}
        Save
      </button>
    </span>
  );
}
