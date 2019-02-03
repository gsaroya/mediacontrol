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

inputController.setSwitch = async (config, input, attempts) => {
  const inputs = JSON.parse(config.inputs);
  if (attempts >= inputs.length * 2) {
    throw new Error("Too many failed attempts");
  }

  await gpio
    .checkInput(config.name)
    .then(res => {
      console.log("Got", res, "Wanted", input);
      if (String(res) == String(input)) {
        return;
      } else {
        inputController
          .trigger(config)
          .then(() => {
            return inputController.setSwitch(config, input, attempts + 1);
          })
          .catch(err => {
            throw new Error(err.message);
          });
      }
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

module.exports = inputController;
