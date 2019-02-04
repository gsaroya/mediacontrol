let hdmiMenu, usbMenu, audioMenu;

const loadMenu = () => {
  [].map.call(document.querySelectorAll(".mdc-button"), function(el) {
    mdc.ripple.MDCRipple.attachTo(el);
  });

  hdmiMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#hdmi-menu"));
  usbMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#usb-menu"));
  audioMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#audio-menu"));

  hdmiMenu.listen("MDCMenu:selected", ({ detail }) => {
    changeHdmi(detail.index);
  });
  usbMenu.listen("MDCMenu:selected", ({ detail }) => {
    changeUsb(detail.index);
  });
  audioMenu.listen("MDCMenu:selected", ({ detail }) => {
    changeAudio(!detail.index);
  });
};

const waitToLoadMenu = () => {
  if (loadingHDMI || loadingUSB || loadingAudio || loadingDate) {
    console.log(loadingHDMI, loadingUSB, loadingAudio, loadingDate);
    setTimeout(waitToLoadMenu, 100);
  } else {
    loadMenu();
  }
};

checkLoaded();
