let hdmiMenu, usbMenu, audioMenu;

const loadMenu = () => {
  [].map.call(document.querySelectorAll(".mdc-button"), function(el) {
    mdc.ripple.MDCRipple.attachTo(el);
  });

  hdmiMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#hdmi-menu"));
  usbMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#usb-menu"));
  audioMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#audio-menu"));

  hdmiMenu.listen("MDCMenu:selected", ({ detail }) => {
    if (detail.index == 0) return;
    changeHdmi(detail.index - 1);
  });
  usbMenu.listen("MDCMenu:selected", ({ detail }) => {
    if (detail.index == 0) return;
    changeUsb(detail.index - 1);
  });
  audioMenu.listen("MDCMenu:selected", ({ detail }) => {
    if (detail.index == 0) return;
    if (detail.index == 1) changeAudio(true);
    if (detail.index == 2) changeAudio(false);
  });
};

const waitToLoadMenu = () => {
  if (loadingHDMI || loadingUSB || loadingAudio || loadingDate) {
    setTimeout(waitToLoadMenu, 100);
  } else {
    loadMenu();
  }
};

showLoading();
waitToLoadMenu();
