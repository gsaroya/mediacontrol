gpioController = {};

// Simulate button press using a pin
gpioController.trigger = pin => {
  return new Promise((resolve, reject) => {
    try {
      const spawn = require("child_process").spawn;
      const command = spawn("python", ["./python/click.py", pin]);
      command.on("close", () => {
        resolve();
      });
      command.on("error", err => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Determine which input is enabled
gpioController.checkInput = name => {
  return new Promise((resolve, reject) => {
    try {
      console.log("checking...");
      const spawn = require("child_process").spawn;
      const command = spawn("python", ["./python/read.py", name]);
      let result = "";
      command.stdout.on("data", data => {
        result += data.toString();
      });
      command.on("close", () => {
        resolve(result.trim());
      });
      command.on("error", err => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = gpioController;
