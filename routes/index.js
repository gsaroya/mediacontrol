var express = require("express");
var router = express.Router();
const input = require("../controllers/input");
const audio = require("../controllers/audio");

process.env.hdmi = 0;
process.env.usb = 0;
process.env.audio = false;
process.env.date = Date();

// Check check input for both sources and update process env accordingly
router.post("/refresh", function(req, res, next) {
  refresh().then(res("Success"));
});

router.get("/date", function(req, res, next) {
  res.send(process.env.date);
});

router.get("/audio", function(req, res, next) {
  res.send(process.env.audio);
});

router.post("/audio", function(req, res, next) {
  if (req.body.enabled) {
    audio.enable().then(res.send("Success"));
  } else {
    audio.disable().then(res.send("Success"));
  }
});

const refresh = () => {
  return new Promise((resolve, reject) => {
    process.env.date = Date();
    input
      .checkInput("hdmi")
      .then(res => {
        process.env.hdmi = res;
        input.checkInput("usb");
      })
      .then(res => {
        process.env.usb = res;
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

// refresh();

module.exports = router;
