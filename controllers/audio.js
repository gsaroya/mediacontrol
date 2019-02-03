const input = require("./input");

audioController = {};

audioController.startService = () => {
  return new Promise((resolve, reject) => {
    const spawn = require("child_process").spawn;
    const command = spawn("sudo", ["systemctl", "start", "audrelay.service"]);
    command.on("close", () => {
      process.env.audio = true;
      resolve();
    });
    command.on("error", err => {
      reject(err);
    });
  });
};

audioController.disable = () => {
  return new Promise((resolve, reject) => {
    const spawn = require("child_process").spawn;
    const command = spawn("sudo", ["systemctl", "stop", "audrelay.service"]);
    command.on("close", () => {
      process.env.audio = false;
      resolve();
    });
    command.on("error", err => {
      reject(err);
    });
  });
};

audioController.enable = () => {
  return new Promise((resolve, reject) => {
    // Ensure usb is connected to pi
    config = require("dotenv").config({ path: `.usb.env` }).parsed;
    pi = JSON.parse(config.inputs).indexOf("Pi");

    input
      .setSwitch(config, pi, 0)
      .then(() => {
        audioController.startService();
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = audioController;
