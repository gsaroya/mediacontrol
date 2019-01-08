var express = require('express');
var router = express.Router();

process.env.hdmi = 0;
process.env.usb = 0;
process.env.audio = false;

// Check check input for both sources and update process env accordingly
router.post('/refresh', function(req, res, next) {
  res.send("TODO");
});

router.get('/audio', function(req, res, next) {
  res.send("TODO: Audio Status");
});

router.post('/audio', function(req, res, next) {
  res.send("TODO: Enable/Disable USB Audio");
});

module.exports = router;
