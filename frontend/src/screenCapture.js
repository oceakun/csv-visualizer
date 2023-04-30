const takeScreenshot = () => {
    const canvas = document.querySelector("canvas");
    const img = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = img;
    console.log("image : ", image);
    a.download = "sketch_screenshot.png"
    document.body.appendChild(a)
    a.click();
    document.body.removeChild(a);
}

console.log("inside the scripttag");
window.onmessage = function (e) {
    if (e.origin !== 'http://localhost:3001') {
    // Ignore messages from unknown origins
    return;
  }
    if (e.data == "downloadSketch") {
        console.log("executing the takeScreenshot function");
        takeScreenshot();
    }
}