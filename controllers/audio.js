const input = require("./input");

audioController = {};

audioController.startService = () => {
  const spawn = require("child_process").spawn;
  const command = spawn("sudo", ["systemctl", "start", "audrelay.service"]);
};

audioController.stopService = () => {
  const spawn = require("child_process").spawn;
  const command = spawn("sudo", ["systemctl", "stop", "audrelay.service"]);
};

audioController.enable = () => {
  process.env.audio = true;

  // Ensure usb is connected to pi
  config = require("dotenv").config({ path: `.usb.env` }).parsed.inputs;
  pi = JSON.parse(config).indexOf("Pi");
  input.setSwitch("usb", pi).then(() => {
    console.log("Waiting to start service...");
    setTimeout(audioController.startService, 5000);
  });
};

audioController.disable = () => {
  process.env.audio = false;
  audioController.stopService();
};

module.exports = audioController;
