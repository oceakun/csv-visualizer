import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userSpecificAssetsDisplayStatus } from "../../store/ComponentsDisplayPropertyStore";
import { currentUserUid } from "../../store/UserStore";
import { newFileSaved } from "../../store/SavedFileStore";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./UserStoredFiles.css";
import binImage from "../../assets/bin.svg";

// function createFileData(name, size, dateOfUpload, type, panelLink) {
//   return { name, size, dateOfUpload, type, panelLink };
// }

export default function UserStoredFiles() {
  const [fetchedDocs, setFetchedDocs] = useState([
    {
      fileName: "demo",
      fileSize: "demo",
      fileType: "demo",
      savedAt: "demo",
      panelLink: "demo",
    },
  ]);

  const displayStatusClass = useStore(userSpecificAssetsDisplayStatus);
  const $newFileSaved = useStore(newFileSaved);
  const $currentUserUid = useStore(currentUserUid);

  useEffect(() => {
    if ($currentUserUid) {
      const userCollectionRef = collection(db, $currentUserUid);
      console.log("userCollectionRef : ", userCollectionRef);
      const addFileDocToUserCollection = async (userCollectionRef) => {
        try {
          const docFetched = await getDocs(userCollectionRef);
          console.log("Document fetched: ", docFetched.data);
          setFetchedDocs(docFetched.data);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };
      addFileDocToUserCollection(userCollectionRef);
      newFileSaved.set(false);
    }
  }, [$newFileSaved]);

  // const fileList = [
  //   createFileData(
  //     "file 1",
  //     "28 KB",
  //     "22-03-2023",
  //     "application/vnd.ms-excel",
  //     "---url here---"
  //   ),
  //   createFileData(
  //     "file 1",
  //     "28 KB",
  //     "22-03-2023",
  //     "application/vnd.ms-excel",
  //     "---url here---"
  //   ),
  //   createFileData(
  //     "file 1",
  //     "28 KB",
  //     "22-03-2023",
  //     "application/vnd.ms-excel",
  //     "---url here---"
  //   ),
  //   createFileData(
  //     "file 1",
  //     "28 KB",
  //     "22-03-2023",
  //     "application/vnd.ms-excel",
  //     "---url here---"
  //   ),
  // ];

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
            {fetchedDocs.map((file, index) => {
              return (
                <tr id={index}>
                  <td>{file.fileName}</td>
                  <td>{file.fileSize}</td>
                  <td>{file.savedAt}</td>
                  <td>{file.fileType}</td>
                  <td>{file.panelLink}</td>
                  <td>
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
