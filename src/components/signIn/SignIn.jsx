import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { userSpecificAssetsDisplayStatus, saveButtonDisplayStatus} from "../../store/ComponentsDisplayPropertyStore";
import { auth } from "../../firebase";
import { currentUserUid, userEmail } from "../../store/UserStore";
import "./SignIn.css";

function SignIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [
    passwordAndEmailNotMatchWarningClass,
    setPasswordAndEmailNotMatchWarningClass,
  ] = useState("passwordAndEmailNotMatchWarningContainerNotDisplayed");

  const updateCurrentUserEmailAndUid = () => {
    console.log("updateCurrentUserEmailAndUid executing");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user : ", user);
        currentUserUid.set(user.uid);
        userEmail.set(user.email);
        userSpecificAssetsDisplayStatus.set("userSpecificAssetsDisplayed");
        saveButtonDisplayStatus.set("saveButtonDisplayed");
      } else {
        console.log("no user");
      }
    });
  };

  const logIn = async (e) => {
    e.preventDefault();
    setPasswordAndEmailNotMatchWarningClass(
      "passwordAndEmailNotMatchWarningContainerNotDisplayed"
    );
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      updateCurrentUserEmailAndUid();
    } catch (error) {
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/wrong-password).") {
        setPasswordAndEmailNotMatchWarningClass(
          "passwordAndEmailNotMatchWarningContainerDisplayed"
        );
      }
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setLoginEmail(val);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setLoginPassword(val);
  };
  //
  return (
    <div className="SignInContainer">
      <div className="LoginContainer">
        <h3>Log-In</h3>
        <div className="InputFieldContainer">
          <div className={passwordAndEmailNotMatchWarningClass}>
            <p style={{ textAlign: "left" }}>
              * password and email <br />
              don't match
            </p>
          </div>

          <p>E-mail</p>
          <input
            type="email"
            onChange={handleEmail}
            value={loginEmail}
            name="email"
            required
          ></input>
        </div>

        <div className="InputFieldContainer">
          <p>Password</p>
          <input
            type="password"
            onChange={handlePassword}
            value={loginPassword}
            name="password"
            required
          ></input>
        </div>

        <div className="SubmitButtonContainer">
          <button type="submit" onClick={logIn}>
            Sign-In
          </button>
        </div>

        <p id="alternativeChoice">
          New here ?{" "}
        </p>
      </div>
    </div>
  );
}

export default SignIn;
