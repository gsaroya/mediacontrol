var express = require("express");
var router = express.Router();
const input = require("../controllers/input");

process.env.hdmi = 0;
process.env.usb = 0;
process.env.audio = false;

// Check check input for both sources and update process env accordingly
router.post("/refresh", function(req, res, next) {
  input
    .checkInput("hdmi")
    .then(res => {
      process.env.hdmi = res;
      input.checkInput("usb");
    })
    .then(res => {
      process.env.usb = res;
    });
  res.send("Done");
});

router.get("/audio", function(req, res, next) {
  res.send("TODO: Audio Status");
});

router.post("/audio", function(req, res, next) {
  res.send("TODO: Enable/Disable USB Audio");
});

module.exports = router;
