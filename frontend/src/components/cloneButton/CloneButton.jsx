import React from "react";
import { useStore } from "@nanostores/react";
import cloneImage from "../../assets/clone.svg";
import { newPanelID } from "../../store/GrafanaDashboardStore";

export default function CloneButton() {
  const $newPanelID = useStore(newPanelID);
  const panelBaseurl = import.meta.env.PUBLIC_SOLO_PANEL_URL;
  const currentPanelLink = panelBaseurl + $newPanelID;
  const copyLink = () => {
    comnsole.log("current link copied");
    navigator.clipboard.writeText(currentPanelLink);
  };
  return (
    <div onClick={copyLink}>
      <img
        id="cloneImage"
        src={cloneImage}
        height="18"
        width="18"
        alt="Clone"
      />
    </div>
  );
}
