let hdmiInputs;
let usbInputs;
let audioEnabled;
let lastUpdated;
let loadingHDMI = (loadingUSB = loadingAudio = loadingDate = true);

const xhrHdmiInputs = new XMLHttpRequest();
const xhrHdmiInput = new XMLHttpRequest();
const xhrUsbInputs = new XMLHttpRequest();
const xhrUsbInput = new XMLHttpRequest();
const xhrAudio = new XMLHttpRequest();
const xhrDate = new XMLHttpRequest();

xhrHdmiInputs.onreadystatechange = function() {
  if (this.readyState == 4) {
    let hdmiList = document.getElementById("hdmi-list");
    while (hdmiList.childElementCount > 0) {
      hdmiList.removeChild(hdmiList.firstChild);
    }
    hdmiInputs = JSON.parse(JSON.parse(this.responseText));
    hdmiInputs.forEach(element => {
      let item = document.createElement("li");
      item.setAttribute("class", "mdc-list-item");
      item.setAttribute("role", "menuitem");
      let span = document.createElement("span");
      span.setAttribute("class", "mdc-list-item__text");
      span.innerHTML = element;
      item.appendChild(span);
      hdmiList.appendChild(item);
    });
  }
};

xhrHdmiInput.onreadystatechange = function() {
  if (this.readyState == 4) {
    console.log("")
    hdmiInput = JSON.parse(this.responseText);
    document.getElementById(
      "hdmi-input"
    ).innerText = `HDMI input: ${hdmiInput}`;
    document.getElementById("hdmi-input-label").innerText =
      hdmiInputs[hdmiInput];
  }
  loadingHDMI = false;
};

xhrAudio.onreadystatechange = function() {
  if (this.readyState == 4) {
    audioEnabled = JSON.parse(this.responseText);
    document.getElementById("usb-audio-label").innerText = audioEnabled
      ? "Enabled"
      : "Disabled";
  }
  loadingAudio = false;
};

xhrDate.onreadystatechange = function() {
  if (this.readyState == 4) {
    document.getElementById("refresh-date").innerText = this.responseText;
  }
  loadingDate = false;
};

const loadInfo = () => {
  xhrHdmiInputs.open("GET", "hdmi/inputs", true);
  xhrHdmiInputs.send();
  xhrHdmiInput.open("GET", "hdmi/input", true);
  xhrHdmiInput.send();
  // xhrUsbInputs.open("GET", "usb/inputs", true);
  // xhrUsbInputs.send();
  // xhrUsbInput.open("GET", "usb/input", true);
  // xhrUsbInput.send();
  xhrAudio.open("GET", "/audio", true);
  xhrAudio.send();
  xhrDate.open("GET", "/date", true);
  xhrDate.send();
};

loadInfo();
