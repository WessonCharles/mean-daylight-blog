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
app.post("/article/comment",index.postcomm)
// app.get("/tech/delete",index.remove);
app.delete("/article/delete",index.remove)
app.post("/common/imageupload",index.imageupload);
app.get("/common/imagecrop",index.imagecrop);
app.post("/sendcode",index.sendcode);
app.post("/login",index.login);

module.exports = app;
