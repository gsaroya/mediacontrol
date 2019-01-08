const gpio = require("./gpio");

inputController = {};

// Use process of elimination on all analog channels to determine which one is enabled
inputController.checkInput = source => {
  // Load analog channels from env
  config = require("dotenv").config({ path: `.${source}.env` }).parsed;
  const pins = config.analogChannels;

  let curr;
  // for pins in analog channels (except the last one)
  //   if (X <= gpio.read(pin) <= Y) curr = i
  // if (!curr)
  //  curr = pins.length() - 1
};

inputController.setSwitch = (source, input) => {
  // Validate that "input" is valid based on source environment
  // Call gpio.trigger(pin) and inputController.checkInput until desired input

  // For now just trigger once
  config = require("dotenv").config({ path: `.${source}.env` }).parsed;
  gpio.trigger(config.bcmPin);
};

module.exports = inputController;
