const input = require("./input");

audioController = {};

audioController.startService = (resolve, reject) => {
  const spawn = require("child_process").spawn;
  const command = spawn("sudo", ["systemctl", "start", "audrelay.service"]);
  command.on("close", () => {
    process.env.audio = true;
    resolve();
  });
  command.on("error", err => {
    reject(err);
  });
};

audioController.stopService = (resolve, reject) => {
  const spawn = require("child_process").spawn;
  const command = spawn("sudo", ["systemctl", "stop", "audrelay.service"]);
  command.on("close", () => {
    process.env.audio = false;
    resolve();
  });
  command.on("error", err => {
    reject(err);
  });
};

audioController.enable = () => {
  return new Promise((resolve, reject) => {
    // Ensure usb is connected to pi
    config = require("dotenv").config({ path: `.usb.env` }).parsed.inputs;
    pi = JSON.parse(config).indexOf("Pi");

    input
      .setSwitch("usb", pi)
      .then(() => {
        audioController.startService(resolve, reject);
      })
      .catch(err => {
        reject(err);
      });
  });
};

audioController.disable = () => {
  return new Promise((resolve, reject) => {
    audioController.stopService(resolve, reject).catch(err => {
      reject(err);
    });
  });
};

module.exports = audioController;
