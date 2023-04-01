import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSpecificAssetsDisplayStatus } from "../../store/ComponentsDisplayPropertyStore";
import {
  currentUserUid,
  filesfetchedFromFirestore,
} from "../../store/UserStore";
import { newFileSaved } from "../../store/SavedFileStore";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

import "./UserStoredFiles.css";
import binImage from "../../assets/bin.svg";

export default function UserStoredFiles() {
  const [fetchedDocs, setFetchedDocs] = useState([
    {
      id: "--",
      fileName: "--",
      fileSize: "--",
      fileType: "--",
      savedAt: "--",
      panelLink: "--",
    },
  ]);
  const displayStatusClass = useStore(userSpecificAssetsDisplayStatus);
  const $newFileSaved = useStore(newFileSaved);
  const $currentUserUid = useStore(currentUserUid);
  const $filesfetchedFromFirestore = useStore(filesfetchedFromFirestore);

  useEffect(() => {
    if ($currentUserUid) {
      const userCollectionRef = collection(db, $currentUserUid);
      // console.log("userCollectionRef : ", userCollectionRef);
      onSnapshot(userCollectionRef, (querySnapshot) => {
        const tempSavedFilesDataArray = [];
        querySnapshot.forEach((doc) => {
          tempSavedFilesDataArray.push({ id: doc.id, ...doc.data() });
        });
        // console.log("tempSavedFilesDataArray : ", tempSavedFilesDataArray);

        setFetchedDocs(tempSavedFilesDataArray);
        filesfetchedFromFirestore.set(tempSavedFilesDataArray);
      });
      newFileSaved.set(false);
    }
  }, [$newFileSaved, $currentUserUid]);

  const depopulateSavedFilesContainer = (fileID) => {
    const documentID = fileID;
    if ($currentUserUid) {
      const userDocRef = doc(db, $currentUserUid, documentID);
      console.log("userDocRef : ", userDocRef);
      const deleteDocWithUserDocRef = async (userDocRef) => {
        try {
          await deleteDoc(userDocRef);
          console.log("Document deleted with ID: ", documentID);
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      };
      deleteDocWithUserDocRef(userDocRef);
    }
  };

  return (
    <div className={displayStatusClass}>
      <div className="tableAndFileExplorer">
        <table className="styled-table table-responsive">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>Saved </th>
              <th>File Type</th>
              <th>Panel Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {$filesfetchedFromFirestore.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.fileName}</td>
                  <td>{file.fileSize}</td>
                  <td>{file.savedAt}</td>
                  <td>{file.fileType}</td>
                  <td>{file.panelLink}</td>
                  <td
                    id="deleteDoc"
                    onClick={() => {
                      depopulateSavedFilesContainer(file.id);
                    }}
                  >
                    <img id="binImage" src={binImage} width="16" alt="bin" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
