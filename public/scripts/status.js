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

xhrHdmiInputs.onload = function() {
  let hdmiList = document.getElementById("hdmi-list");
  while (hdmiList.childElementCount > 0) {
    hdmiList.removeChild(hdmiList.firstChild);
  }

  let cancelItem = document.createElement("li");
  cancelItem.setAttribute("class", "mdc-list-item");
  cancelItem.setAttribute("role", "menuitem");
  let cancelSpan = document.createElement("span");
  cancelSpan.setAttribute("class", "mdc-list-item__text");
  cancelSpan.innerHTML = "✖ Cancel";
  cancelItem.appendChild(cancelSpan);
  hdmiList.appendChild(cancelItem);

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
  xhrHdmiInput.open("GET", "hdmi/input", true);
  xhrHdmiInput.send();
};

xhrHdmiInput.onload = function() {
  hdmiInput = JSON.parse(this.responseText);
  document.getElementById("hdmi-input").innerText = `HDMI input: ${hdmiInput}`;
  document.getElementById("hdmi-input-label").innerText = hdmiInputs[hdmiInput];
  loadingHDMI = false;
};

xhrUsbInputs.onload = function() {
  let usbList = document.getElementById("usb-list");
  while (usbList.childElementCount > 0) {
    usbList.removeChild(usbList.firstChild);
  }

  let cancelItem = document.createElement("li");
  cancelItem.setAttribute("class", "mdc-list-item");
  cancelItem.setAttribute("role", "menuitem");
  let cancelSpan = document.createElement("span");
  cancelSpan.setAttribute("class", "mdc-list-item__text");
  cancelSpan.innerHTML = "✖ Cancel";
  cancelItem.appendChild(cancelSpan);
  usbList.appendChild(cancelItem);
  
  usbInputs = JSON.parse(JSON.parse(this.responseText));
  usbInputs.forEach(element => {
    let item = document.createElement("li");
    item.setAttribute("class", "mdc-list-item");
    item.setAttribute("role", "menuitem");
    let span = document.createElement("span");
    span.setAttribute("class", "mdc-list-item__text");
    span.innerHTML = element;
    item.appendChild(span);
    usbList.appendChild(item);
  });
  xhrUsbInput.open("GET", "usb/input", true);
  xhrUsbInput.send();
};

xhrUsbInput.onload = function() {
  usbInput = JSON.parse(this.responseText);
  document.getElementById("usb-input").innerText = `USB input: ${usbInput}`;
  document.getElementById("usb-input-label").innerText = usbInputs[usbInput];
  loadingUSB = false;
};

xhrAudio.onload = function() {
  audioEnabled = JSON.parse(this.responseText);
  document.getElementById("usb-audio-label").innerText = audioEnabled
    ? "Enabled"
    : "Disabled";
  loadingAudio = false;
};

xhrDate.onload = function() {
  updated = new Date(this.responseText);
  lastUpdated = updated.toLocaleString("en-CA");
  document.getElementById("refresh-date").innerText = lastUpdated;
  loadingDate = false;
};

const loadInfo = () => {
  xhrHdmiInputs.open("GET", "hdmi/inputs", true);
  xhrHdmiInputs.send();
  xhrUsbInputs.open("GET", "usb/inputs", true);
  xhrUsbInputs.send();
  xhrAudio.open("GET", "/audio", true);
  xhrAudio.send();
  xhrDate.open("GET", "/date", true);
  xhrDate.send();
};

document.addEventListener('DOMContentLoaded', loadInfo, false);