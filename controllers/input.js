const gpio = require("./gpio");

inputController = {};

inputController.checkInput = source => {
  return new Promise((resolve, reject) => {
    gpio.checkInput(source).then(input => resolve(input));
  });
};

inputController.trigger = source => {
  // Validate that "input" is valid based on source environment
  // Call gpio.trigger(pin) and inputController.checkInput until desired input

  // For now just trigger once
  return new Promise((resolve, reject) => {
    config = require("dotenv").config({ path: `.${source}.env` }).parsed;
    gpio.trigger(config.bcmPin).then(resolve());
  });
};

inputController.setSwitch = (source, input) => {
  return new Promise((resolve, reject) => {
    gpio.checkInput(source).then(res => {
      if (res == String(input)) {
        resolve();
      } else {
        console.log("Re-run");
        inputController
          .trigger(source)
          .then(() => {
            inputController.setSwitch(source, input);
          })
          .then(() => {
            resolve();
          });
      }
    });
  });
};

module.exports = inputController;
