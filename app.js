global.db_server = "localhost";
global.db_port = 27017;
global.root_name = "daylight";
global.upload_root = __dirname;
global.path_core = __dirname+"/server/api/core";
global.path_api = __dirname+"/server/api/api"
global.BaseApi = {isDebug : true};
global.file_url = __dirname;


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
var multer = require('multer');
var colors = require('colors')
// var fmm = require('./file-md5-map');

var debug = require("debug")("daylight");
var app = express();

/**
 * app.get("env")来获取环境 是开发环境还是生产环境，来决定
 * 进入不同的前段路径。
 *
 * (以下操作要进入项目根目录设置)
 * 
 * 在此之前，应该在开发环境的电脑上配置export NODE_ENV=development
 *
 * 再服务器上配置export NODE_ENV=production，并且服务器上 应该对前端执行gulp
 * 
 * @type {[type]}
 */
var env = app.get("env");
//开发环境
if(env=="development"){
    console.log("开发-----")
    console.log("//////".white+"/\//////////".green+"/////////".white);
    console.log("//////".white+"/\///".green+"//////".white+"/\///".green+"///////".white);
    console.log("//////".white+"/\///".green+"////////".white+"/\///".green+"/////".white);
    console.log("//////".white+"/\///".green+"///".white+"开发".red+"///".white+"/\///".green+"////".white);
    console.log("//////".white+"/\///".green+"///".white+"环境".red+"///".white+"/\///".green+"////".white);
    console.log("//////".white+"/\///".green+"////////".white+"/\///".green+"/////".white);
    console.log("//////".white+"/\///".green+"//////".white+"/\///".green+"///////".white);
    console.log("//////".white+"/\//////////".green+"/////////".white);    
    app.set('views', path.join(__dirname, 'app'));
}else{
//生产环境
    console.log("线上")
    console.log("//////".white+"/\/////////".green+"//////////");
    console.log("//////".white+"//".green+"////////".white+"//".green+"/////////");
    console.log("//////".white+"//".green+"/////////".white+"//".green+"///////");
    console.log("//////".white+"//".green+"/////////".white+"//".green+"///////");
    console.log("//////".white+"/\/////////".green+"/////////");
    console.log("//////".white+"//".green+"///".white+"生产".red+"/////////////");
    console.log("//////".white+"//".green+"///".white+"环境".red+"/////////////");
    console.log("//////".white+"//".green+"///////////////////"); 
    app.set('views', path.join(__dirname, 'dist'));
}
app.set('view engine', 'html');
global.path_root = path.join(__dirname,'server');
console.log(path_root)
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('prerender-node').set('prerenderToken', 'OJKmf9AxMpxIkDJP6xw7'));//prerender.io做seo
app.use(logger('dev'));
app.use(bodyParser.json());//for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));// for parsing application/x-www-form-urlencoded
app.use(multer());// for parsing multipart/form-data
app.use(cookieParser());
//开发环境
if(env=="development"){
    console.log("开发")
    app.use(express.static(path.join(__dirname, 'app')));
}else{
//生产环境
    console.log("线上")
    app.use(express.static(path.join(__dirname, 'dist')));
}

// app.use(function(req,res,next){
//     if(req.headers.host.indexOf('8008')>-1){
//         express.static(path.join(__dirname, 'app'))
//     }else{
//         express.static(path.join(__dirname, 'dist'))        
//     }
//     next();
// });

// app.use('/', function (req, res) {
//     res.sendfile("app/index.html")
//     // res.sendFile(__dirname+'/app/index.html');
// });
app.use(function (req, res,next) {
    if(req.path.indexOf('/api')>-1){
        console.log("It's server router");
        next();
    }else{ //angular启动页
        console.log("It's angular router");
        if(env=="development"){//测试环境
            res.sendfile('app/index.html');            
        }else{//生产环境
            res.sendfile('dist/index.html');
        }
    }
});    
var app_list = ['dl_life','dl_nonsense','dl_sucai-photo','dl_tech','dl_base'];
for(var i=0;i<app_list.length;i++){
    var app_route = require(path_root+'/'+app_list[i]+'/server_route');
    app.use("/api",app_route) 
}
// fmm();


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
