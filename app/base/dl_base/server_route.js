var express = require('express');
var app = express.Router();
var index = require('./index');

// middleware specific to this router
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
app.get("/tech/delete",index.remove);

module.exports = app;
