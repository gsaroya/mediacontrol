gpioController = {};

// Simulate button press using a pin
gpioController.trigger = pin => {
  return new Promise((resolve, reject) => {
    try {
      const spawn = require("child_process").spawn;
      const command = spawn("python", ["./python/click.py", pin]);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// Determine which input is enabled
gpioController.checkInput = source => {
  return new Promise((resolve, reject) => {
    try {
      console.log("checking...");
      const spawn = require("child_process").spawn;
      const command = spawn("python", ["./python/read.py", source]);
      let result = "";
      command.stdout.on("data", data => {
        result += data.toString();
      });
      command.on("close", code => {
        resolve(result.trim());
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = gpioController;
