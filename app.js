global.db_server = "localhost";
global.db_port = 27017;
global.root_name = "daylight";
global.BaseApi = {isDebug : true};


var mongoose = require('mongoose')
var uri = 'mongodb://'+db_server+':'+db_port+'/daylightdata';
global.db = mongoose.connect(uri,function(err){
    if(!err){console.log("mongodb is connected")}else{
        throw err;
    }
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var debug = require("debug")("daylight");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');
global.path_root = path.join(__dirname,'app');
console.log(path_root)
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

// app.use('/', function (req, res) {
//     res.sendfile("app/index.html")
//     // res.sendFile(__dirname+'/app/index.html');
// });
app.use(function (req, res,next) {
    if(req.path.indexOf('/api')>=0){
        console.log("It's server router");
        console.log(req.path)
        next();
    }else{ //angular启动页
        console.log("It's angular router");
        res.sendfile('app/index.html');
    }
});    
var app_list = ['dl_base','dl_hobby','dl_nonsense','dl_read-learn','dl_sucai-photo','dl_tech'];
for(var i=0;i<app_list.length;i++){
    var app_route = require('./app/base/'+app_list[i]+'/server_route');
    app_route(app);
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
