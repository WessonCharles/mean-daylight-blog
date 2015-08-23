var express = require('express');
var app = express.Router();
var index = require('./index');

// middleware specific to this router
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})
app.get("/all",index.getall);
app.get("/one/:id",index.getone);
app.get("/tech/delete",index.remove);
app.post("/common/imageupload",index.imageupload);
app.get("/common/imagecrop",index.imagecrop);

module.exports = app;
