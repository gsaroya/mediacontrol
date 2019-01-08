var express = require('express');
var router = express.Router();
const input = require('../controllers/input');


// GET current input
router.get('/input', function(req, res, next) {
  res.send(process.env.hdmi);
});

// Change current input
router.post('/input', function(req, res, next) {
  const newInput = req.body.input;
  console.log(newInput);
  // validate
  // await input.setSwitch(hdmi, newInput);
  res.send("TODO: Change current input");
});

// GET input list
router.get('/inputs', function(req, res, next) {
  config = require('dotenv').config({path: `.hdmi.env`}).parsed;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(config.inputs));
});

module.exports = router;
