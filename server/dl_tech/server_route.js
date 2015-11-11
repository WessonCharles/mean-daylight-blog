var express = require('express');
var app = express.Router();
var tech = require('./index');

// middleware specific to this router
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
app.get('/tech', tech.gettech);
app.post('/tech',tech.create);
app.post('/tech/update',tech.update)


module.exports = app;

