'use strict';


var appid = 'cytbiQFxM'; 
var conf = 'prod_1719392116e7712b7685989f9d145d1d'; 
var changurl = "http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id="+ appid + "&conf="+ conf;
var width = window.innerWidth || document.documentElement.clientWidth; 
if (width > 960) { 
    changurl="http://changyan.sohu.com/upload/changyan.js";
}
require.config({
    paths: {
        angular: '../bower_components/angular/angular.min',
        angularResource:'../bower_components/angular-resource/angular-resource.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        semantic:'http://7xk7lf.com1.z0.glb.clouddn.com/semantic.min',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        pretty:'../bower_components/pretty/pretty',
        uikit:'../bower_components/uieditor/uikit.min',
        codemirror:'http://7xk7lf.com1.z0.glb.clouddn.com/codemirror',
        markdown:'../bower_components/uieditor/codemirror/mode/markdown/markdown',
        overlay:'../bower_components/uieditor/codemirror/addon/mode/overlay',
        xml:'../bower_components/uieditor/codemirror/mode/xml/xml',
        gfm:'../bower_components/uieditor/codemirror/mode/gfm/gfm',
        marked:'../bower_components/uieditor/marked',
        htmleditor:'../bower_components/uieditor/htmleditor',
        showdown        : "../bower_components/showdown/dist/showdown.min",
        duoshuo:changurl,
        buttonlite:'http://static.bshare.cn/b/buttonLite',
        bshare:'http://static.bshare.cn/b/bshareC2',
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularRoute': ['angular'],
        'angularResource':['angular'],
        'semantic': ['jquery'],
        'pretty':{'exports':'pretty'},

        'uikit':['jquery'],
        'htmleditor':['jquery','uikit','codemirror','marked'],
        'showdown':{'exports':'showdown'},
        'duoshuo':['jquery']
    },
    priority: [
        'angular',
        'jquery',
        'semantic',
        'codemirror'
    ],
    waitSeconds: 0
});


window.name = "NG_DEFER_BOOTSTRAP!";

var url = window.location.pathname;
var load_route_module = url=="/"?"dl_base/dl_base_routes":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_routes";


require([
    'angular',
    'jquery',
    'angularRoute',
    'angularResource',
    'semantic',
    'pretty',
    'uikit',
    'marked',
    'htmleditor',
    'showdown',
    'buttonlite',
    'bshare',
    // 'duoshuo',
    'app',
    'dl_base/dl_base_routes',
    'dl_tech/dl_tech_routes',
    'dl_life/dl_life_routes',
    'dl_add/dl_add_routers'
    ], function(angular) {
    angular.element().ready(function() {
        angular.resumeBootstrap(['base']);
    });
});
