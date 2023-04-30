import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { currentUserUid, userEmail } from "../../store/UserStore";
import { useStore } from "@nanostores/react";
import { auth } from "../../firebase";
import "./SignUp.css";

function SignUp() {
  const $currentUserUid = useStore(currentUserUid);

  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [confirmedRegistrationPassword, setConfirmedRegistrationPassword] =
    useState("");
  const [unmatchedPasswordWarningClass, setUnmatchedPasswordWarningClass] =
    useState("UnmatchedPasswordWarningContainerNotDisplayed");
  const [alreadyInUseWarningClass, setAlreadyInUseWarningClass] = useState(
    "AlreadyInUseEmailWarningContainerNotDisplayed"
  );
  const [registrationFailureWarningClass, setRegistrationFailureWarningClass] =
    useState("registrationFailureWarningContainerNotDisplayed");

  const [
    registrationSuccessfulMessageClass,
    setRegistrationSuccessfulMessageClass,
  ] = useState("registrationSuccessfulMessageNotDisplayed");

  const handleEmail = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setRegistrationEmail(val);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setRegistrationPassword(val);
  };

  const handleConfirmedPassword = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setConfirmedRegistrationPassword(val);
  };

  const register = async () => {
    if (registrationPassword === confirmedRegistrationPassword) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          registrationEmail,
          registrationPassword
        );
        console.log("user : ", user);
        console.log("user.user.uid : ", user.user.uid);
        // userInfo.set(user.user.uid);
        setRegistrationSuccessfulMessageClass(
          "registrationSuccessfulMessageDisplayed"
        );
        setRegistrationEmail("");
        setRegistrationPassword("");
        setConfirmedRegistrationPassword("");
        currentUserUid.set(user.user.uid);
        userEmail.set(user.user.email);
        window.location.replace("/");
      } catch (error) {
        setRegistrationFailureWarningClass(
          "registrationFailureWarningContainerDisplayed"
        );
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setAlreadyInUseWarningClass(
            "AlreadyInUseEmailWarningContainerDisplayed"
          );
        }
        setRegistrationPassword("");
        setConfirmedRegistrationPassword("");
        console.log(error.message);
      }
    } else {
      setUnmatchedPasswordWarningClass(
        "UnmatchedPasswordWarningContainerDisplayed"
      );
      setRegistrationPassword("");
      setConfirmedRegistrationPassword("");
    }
  };

  return (
    <div id="SignUpContainer">
      <h3>Register</h3>

      <div className={registrationFailureWarningClass}>
        <p style={{ textAlign: "left" }}>
          * failed to register, please try again
        </p>
      </div>
      <div className={registrationSuccessfulMessageClass}>
        <p style={{ textAlign: "left" }}>
          * success! sign-in with your creds now
        </p>
      </div>

      <div className="SignUpInputFieldContainer">
        <p>E-mail</p>
        <input
          type="email"
          onChange={handleEmail}
          value={registrationEmail}
          name="email"
          required
        ></input>
      </div>

      <div className={alreadyInUseWarningClass}>
        <p style={{ textAlign: "left" }}>* duplicate e-mail entered.</p>
      </div>

      <div className="SignUpInputFieldContainer">
        <p>Password</p>
        <input
          type="password"
          onChange={handlePassword}
          value={registrationPassword}
          name="password"
          required
        ></input>
      </div>

      <div className="SignUpInputFieldContainer">
        <p>Confirm password</p>
        <input
          type="password"
          onChange={handleConfirmedPassword}
          value={confirmedRegistrationPassword}
          name="password"
          required
        ></input>
      </div>

      <div className={unmatchedPasswordWarningClass}>
        <p style={{ textAlign: "left" }}>* passwords don't match.</p>
      </div>

      <div id="signUpButtonContainer">
        <button type="submit" onClick={register}>
          Sign-Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
