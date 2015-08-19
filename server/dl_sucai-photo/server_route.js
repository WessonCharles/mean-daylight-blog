var express = require('express');
var app = express.Router();
var sucai = require('./index');

// middleware specific to this router
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

module.exports = app;