const gpio = require("./gpio");

inputController = {};

inputController.checkInput = source => {
  return new Promise((resolve, reject) => {
    gpio.checkInput(source).then(input => resolve(input));
  });
};

inputController.trigger = source => {
  return new Promise((resolve, reject) => {
    config = require("dotenv").config({ path: `.${source}.env` }).parsed;
    gpio.trigger(config.bcmPin).then(resolve());
  });
};

inputController.setSwitch = (source, input) => {
  return new Promise((resolve, reject) => {
    gpio.checkInput(source).then(res => {
      console.log("Current: ", String(input));
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
