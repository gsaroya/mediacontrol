[].map.call(document.querySelectorAll(".mdc-button"), function(el) {
  mdc.ripple.MDCRipple.attachTo(el);
});

const hdmiMenu = mdc.menu.MDCMenu.attachTo(
  document.querySelector("#hdmi-menu")
);
const usbMenu = mdc.menu.MDCMenu.attachTo(document.querySelector("#usb-menu"));
const audioMenu = mdc.menu.MDCMenu.attachTo(
  document.querySelector("#audio-menu")
);

hdmiMenu.listen("MDCMenu:selected", ({ detail }) => {
  changeHdmi(detail.index);
});
usbMenu.listen("MDCMenu:selected", ({ detail }) => {
  changeUsb(detail.index);
});
audioMenu.listen("MDCMenu:selected", ({ detail }) => {
  changeAudio(detail.index ? "enabled" : "disabled");
});
