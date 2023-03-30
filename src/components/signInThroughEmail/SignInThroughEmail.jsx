import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useStore } from "@nanostores/react";
import { currentUserUid } from "../../store/UserStore";
import "./SignInThroughEmail.css";

function SignInThroughEmail() {
  const $currentUserUid = useStore(currentUserUid);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const logIn = async () => {
    try {
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("userLoggedIn : ", userLoggedIn);
      currentUserUid.set(userLoggedIn.user.uid);
    } catch (error) {
      console.log(error.message);
    }
    setLoginEmail("");
    setLoginPassword("");
    window.location.replace("/");
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
          <p>E-mail</p>
          <input
            type="email"
            // placeholder="..."
            onChange={handleEmail}
            value={loginEmail}
            name="email"
            required
          ></input>
        </div>

        <div className="SubmitButtonContainer">
          <button type="submit" onclick={logIn}>
            Send link to e-mail
          </button>
        </div>

        <p id="alternativeChoice">
        New here ? {" "}
          <a
            style={{
              textDecoration: "none",
              color: "white",
              borderBottom: "2px solid rgb(8, 8, 36)",
              borderRadius: "2px",
              padding: "2px",
              opacity: 0.7,
            }}
            href="/signup"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignInThroughEmail;
