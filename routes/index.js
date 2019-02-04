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
  refresh()
    .then(() => {
      res.send("Success");
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

router.get("/date", function(req, res, next) {
  res.send(process.env.date);
});

router.get("/audio", function(req, res, next) {
  res.send(process.env.audio);
});

router.post("/audio", function(req, res, next) {
  const audioPromise = req.body.enabled ? audio.enable : audio.disable;
  audioPromise()
    .then(() => {
      res.send("Success");
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

const refresh = () => {
  return new Promise((resolve, reject) => {
    process.env.date = Date();
    input
      .checkInput(require("dotenv").config({ path: `.hdmi.env` }).parsed)
      .then(res => {
        process.env.hdmi = res;
        return input.checkInput(require("dotenv").config({ path: `.usb.env` }).parsed);
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

refresh();

module.exports = router;
