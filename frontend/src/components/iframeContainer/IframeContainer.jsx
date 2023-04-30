import React, { useEffect, useState } from "react"; import { useStore } from "@nanostores/react";
import { newPanelID } from "../../store/GrafanaDashboardStore";
import screenshotImage from "../../assets/screenshot.svg";
import cloneImage from "../../assets/clone.svg";
import "./IframeContainer.css";
import html2canvas from "html2canvas";
export default function IframeContainer() {

  const [captureSketch, setCaptureSketch] = useState(false);
  const [downloadImageData, setDownloadImageData] = useState("");
  const $newPanelID = useStore(newPanelID);
  const panelBaseurl = import.meta.env.PUBLIC_SOLO_PANEL_URL;
  const proxyOrigin = import.meta.env.PUBLIC_PROXY_ORIGIN;
  const iframeSrc = panelBaseurl + $newPanelID;

  // useEffect(() => {

  //   const iframe = document.getElementById("grafanaPanel");
  //   iframe.onload = function () {
  //     const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  //     const script = iframeDoc.createElement('script');
  //     script.src = 'frontend/src/screenCapture.js';
  //     iframeDoc.head.appendChild(script);
  //     console.log("script appended");
  //   };
  
  //   const element = window.document.getElementById(
  //     "screenshot-canvas"
  //   );
  //   console.log("element : ", element);
  //   const html2canvasFunction = async () => {
  //     const canvas = await html2canvas(element);
  //     const image = canvas.toDataURL("image/png");
  //     console.log("image:", image);
  //     setDownloadImageData(image);
  //   };

  //   if (captureSketch) {
  //     html2canvasFunction();
  //     const targetWindow = window.parent; // or window.opener for popups
  //     const targetOrigin = proxyOrigin;
  //     console.log("postin the downloadSketch event!");
  //     console.debug("postin the downloadSketch event!");
  //     iframe.contentWindow.postMessage("downloadSketch", targetOrigin);
  //     setCaptureSketch(false);
  //   }
  // }, [captureSketch]);

  const copyCurrentPanelLinkToClipboard = () => {
    const currentPanelURL =
      panelBaseurl + JSON.parse(localStorage.getItem("newPanelId"));
    navigator.clipboard.writeText(currentPanelURL);
  };

  return (
    <div className="container">
      <div id="iframeActions">
        {/* <div className="tooltip">
          <img onClick={() => setCaptureSketch(true)} id="screenshotImage" src={screenshotImage} width="20" alt="Screenshot" />
          <span className="tooltiptext">Screenshot</span>
        </div> */}
        <div className="tooltip">
          <img onClick={copyCurrentPanelLinkToClipboard} id="cloneImage" src={cloneImage} width="20" alt="Clone" />
          <span className="tooltiptext">Panel link</span>
        </div>
      </div>

      <div id="screenshot-canvas">
        <iframe
          id="grafanaPanel"
          src={iframeSrc}
          className="responsive-iframe"
          frameBorder="0"
          allowFullScreen=""
          style={{ position: "absolute", top: "5rem", left: 0 }}
        />
      </div>
    </div>
  );
}
