const xhrChangeHdmi = new XMLHttpRequest();
const xhrChangeUsb = new XMLHttpRequest();
const xhrChangeAudio = new XMLHttpRequest();
const xhrRefresh = new XMLHttpRequest();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

xhrChangeHdmi.onreadystatechange = async function() {
  if (this.readyState == 4) {
    loadInfo();
  }
};

xhrChangeUsb.onreadystatechange = function() {
  if (this.readyState == 4) {
    loadInfo();
  }
};

xhrChangeAudio.onreadystatechange = function() {
  if (this.readyState == 4) {
    loadInfo();
  }
};

xhrRefresh.onreadystatechange = function() {
  if (this.readyState == 4) {
    loadInfo();
  }
};

const changeHdmi = input => {
  showLoading();
  xhrChangeHdmi.open("POST", "hdmi/input", true);
  xhrChangeHdmi.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  xhrChangeHdmi.send(JSON.stringify({ input }));
};

const changeUsb = input => {
  showLoading();
  xhrChangeUsb.open("POST", "usb/input", true);
  xhrChangeUsb.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  xhrChangeUsb.send(JSON.stringify({ input }));
};

const changeAudio = enabled => {
  showLoading();
  xhrChangeAudio.open("POST", "audio", true);
  xhrChangeAudio.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  xhrChangeAudio.send(JSON.stringify({ enabled }));
};

const changeRefresh = () => {
  showLoading();
  xhrRefresh.open("POST", "refresh", true);
  xhrRefresh.send();
};

const showLoading = () => {
  loadingHDMI = (loadingUSB = loadingAudio = loadingDate = true);
  document.getElementById("loading").setAttribute("class", "");
  waitTillLoaded();
};

const waitTillLoaded = () => {
  if (loadingHDMI || loadingUSB || loadingAudio || loadingDate) {
    setTimeout(waitTillLoaded, 100);
  } else {
    document.getElementById("loading").setAttribute("class", "hidden");
  }
};
