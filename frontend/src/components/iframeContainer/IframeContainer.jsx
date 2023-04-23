import React from "react";
import { useStore } from "@nanostores/react";
import { newPanelID } from "../../store/GrafanaDashboardStore";

export default function IframeContainer() {
  const $newPanelID = useStore(newPanelID);
  const panelBaseurl = import.meta.env.PUBLIC_SOLO_PANEL_URL;
  const iframeSrc = panelBaseurl + $newPanelID;
  return (
    <iframe
      width="100%"
      height="90%"
      src={iframeSrc}
      className="responsive-iframe"
      frameBorder="0"
      allowFullScreen=""
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
}
