'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular.min',
        angularResource:'../bower_components/angular-resource/angular-resource.min',
        // jquery: '../bower_components/jquery/dist/jquery.min',
        jquery:'//cdn.bootcss.com/jquery/2.1.4/jquery.min',
        // semantic: '../bower_components/semantic-ui/dist/semantic.min',
        semantic:'http://libs.cncdn.cn/semantic-ui/2.0.1/semantic.min',
        // jqueryui: '../bower_components/jqueryui/jquery-ui.min',
        // nicescroll:'../bower_components/nicescroll/jquery.nicescroll.min',
        // validate:'../bower_components/validation/jqBootstrapValidation',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        // ueconf:'../bower_components/ueditor/ueditor.config',
        // codemirror:'../bower_components/ueditor/third-party/codemirror/codemirror',
        codemirror:'http://cdn.staticfile.org/codemirror/4.7.0/codemirror.min',
        behave:'../bower_components/bootstrap-markdown-editor/js/behave',
        pretty:'../bower_components/bootstrap-markdown-editor/js/run_pretty',
        markdown:'../bower_components/bootstrap-markdown-editor/js/markdown',
        tomark:'../bower_components/bootstrap-markdown-editor/js/to_markdown',
        markeditor:'../bower_components/bootstrap-markdown-editor/js/bootstrap-markdown',
        // ueall:'../bower_components/ueditor/ueditor.all',
        // uelan:'../bower_components/ueditor/lang/zh-cn/zh-cn',
        // sh:'../bower_components/ueditor/third-party/SyntaxHighlighter/shCore',
        sh:'http://cdn.staticfile.org/SyntaxHighlighter/3.0.83/scripts/shCore.min',
        // color:'../bower_components/jcrop/js/jquery.color',
        color:'http://cdn.staticfile.org/jquery-jcrop/0.9.12/js/jquery.color.min',
        // jcrop:'../bower_components/jcrop/js/jquery.Jcrop.min',
        jcrop:'http://cdn.staticfile.org/jquery-jcrop/0.9.12/js/jquery.Jcrop.min'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularRoute': ['angular'],
        'angularResource':['angular'],
        'semantic': ['jquery'],
        // 'nicescroll':['jquery'],
        // 'validate':['jquery'],
        // 'ueconf':{'exports':'ueconf'},
        'markeditor':['jquery','behave','pretty','markdown','tomark'],
        'codemirror':{'exports':'codemirror'},
        'sh':{'exports':'sh'},
        // 'ueall':['jquery','codemirror','sh'],
        // 'uelan':['ueall'],
        'color':['jquery'],
        'jcrop':['jquery','color']
    },
    priority: [
        'angular',
        'jquery',
    ]
});


window.name = "NG_DEFER_BOOTSTRAP!";

var url = window.location.pathname;
var load_route_module = url=="/"?"dl_base/dl_base_routes":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_routes";


require([
    'angular',
    'jquery',
    'angularRoute',
    'angularResource',
    // 'jqueryui',
    'semantic',
    // 'nicescroll',
    // 'validate',
    // 'ueconf',
    'codemirror',
    'markeditor',
    // 'uelan',
    'sh',
    // 'ueall',
    'jcrop',
    'app',
    'dl_base/dl_base_routes',
    'dl_tech/dl_tech_routes',
    'dl_add/dl_add_routers'
    ], function(angular) {
    angular.element().ready(function() {
        angular.resumeBootstrap(['base']);
    });
});
