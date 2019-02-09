var express = require("express");
var router = express.Router();
const input = require("../controllers/input");
const gpio = require("../controllers/gpio");

// GET current input
router.get("/input", function(req, res, next) {
  res.send(process.env.usb);
});

// Change current input
router.post("/input", function(req, res, next) {
  config = require("dotenv").config({ path: `.usb.env` }).parsed.inputs;
  const newInput = req.body.input;
  if (!validateUsb(newInput)) {
    throw new Error("Invalid input");
  }
  input
    .setSwitch(config, newInput, 0)
    .then(() => {
      process.env.usb = newInput;
      res.send("Success");
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

// GET input list
router.get("/inputs", function(req, res, next) {
  config = require("dotenv").config({ path: `.usb.env` }).parsed;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(config.inputs));
});

const validateUsb = input => {
  config = require("dotenv").config({ path: `.usb.env` }).parsed;
  return (
    typeof input === "number" && 0 <= input && input < config.inputs.length
  );
};

module.exports = router;
