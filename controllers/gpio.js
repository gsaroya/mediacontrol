gpioController = {};

// Simulate button press using a pin
gpioController.trigger = pin => {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", ["./python/click.py", pin]);
};

// Read an analog input to determine if it on/off
gpioController.read = pin => {};

module.exports = gpioController;
