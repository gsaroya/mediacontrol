const gpio = require("./gpio");

inputController = {};

inputController.checkInput = config => {
  return new Promise((resolve, reject) => {
    gpio
      .checkInput(config.name)
      .then(input => resolve(input))
      .catch(err => {
        reject(err);
      });
  });
};

inputController.trigger = config => {
  return new Promise((resolve, reject) => {
    gpio
      .trigger(config.bcmPin)
      .then(resolve())
      .catch(err => {
        reject(err);
      });
  });
};

inputController.setSwitch = (config, input, attempts) => {
  return new Promise((resolve, reject) => {
    if (attempts >= config.inputs.length * 2) {
      reject("Too many failed attempts");
    }
    gpio.checkInput(source).then(res => {
      if (res == String(input)) {
        resolve();
      } else {
        inputController
          .trigger(source, config)
          .then(() => {
            inputController.setSwitch(source, input);
          })
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  });
};

module.exports = inputController;
