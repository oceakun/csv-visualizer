import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { userEmail, currentUserUid } from "../../store/UserStore";
import {userSpecificAssetsDisplayStatus} from "../../store/ComponentsDisplayPropertyStore";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./AuthenticatedUserEmailContainer.css";

export default function AuthenticatedUserEmailContainer() {
  const $userEmail = useStore(userEmail);

  const signOutHandler = async () => {
    console.log("signed out");
    if (auth.currentUser !== null) {
      try {
        const user = await signOut(auth);
        console.log("signOut was successful : ", user);
        currentUserUid.set("");
        userEmail.set("");
        userSpecificAssetsDisplayStatus.set("userSpecificAssetsNotDisplayed");
      } catch (error) {
        console.log("an error occured while signing out", error.message);
      }
    } else {
      console.log("no user signed in");
    }
  };

  return (
    <>
      {$userEmail !== "" ? (
        <span>
          <mark id="greetUser">| {$userEmail.substring(0,5)}...</mark>{" "}
          <button id="signOut" onClick={signOutHandler}>Sign out ?</button>
        </span>
      ) : (
        <span>.</span>
      )}
    </>
  );
}
