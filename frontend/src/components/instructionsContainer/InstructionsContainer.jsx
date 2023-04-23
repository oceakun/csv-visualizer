import React from "react";
import "./InstructionsContainer.css";
export default function InstructionsContainer() {
  return (
    <div className="instructionsContainer">
      <h1>Brief summary of the documentation goes here</h1>
      <div className="individualDiv">
        <h2>Use as such</h2>
        <p>
          <mark>&#707;</mark> press 'Upload', a modal window will appear{" "}
        </p>
        <p>
          <mark>&#707;</mark> browse through your computer, choose a file, press
          'submit'
        </p>
        <p>
          <mark>&#707;</mark> press 'Visuapze'
        </p>
      </div>
      <div className="individualDiv">
        <h2>Sign-up and use</h2>
        <p>
          <mark>&#707;</mark> press 'Upload', a modal window will appear{" "}
        </p>
        <p>
          <mark>&#707;</mark> browse through your computer, choose a file, press
          'submit'
        </p>
        <p>
          <mark>&#707;</mark> press 'Visuapze'
        </p>
      </div>
    </div>
  );
}
