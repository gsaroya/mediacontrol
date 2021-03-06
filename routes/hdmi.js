var express = require("express");
var router = express.Router();
const input = require("../controllers/input");
const gpio = require("../controllers/gpio");

// GET current input
router.get("/input", function(req, res, next) {
  res.send(process.env.hdmi);
});

// Change current input
router.post("/input", function(req, res, next) {
  config = require("dotenv").config({ path: `.hdmi.env` }).parsed.inputs;
  const newInput = req.body.input;
  if (!validateHdmi(newInput)) {
    throw new Error("Invalid input");
  }
  input
    .setSwitch(config, newInput, 0)
    .then(() => {
      process.env.hdmi = newInput;
      res.send("Success");
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

// GET input list
router.get("/inputs", function(req, res, next) {
  config = require("dotenv").config({ path: `.hdmi.env` }).parsed;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(config.inputs));
});

const validateHdmi = input => {
  config = require("dotenv").config({ path: `.hdmi.env` }).parsed;
  return (
    typeof input === "number" && 0 <= input && input < config.inputs.length
  );
};

module.exports = router;
