'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular.min',
        angularResource:'../bower_components/angular-resource/angular-resource.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        // jquery:'http://cdn.bootcss.com/jquery/2.1.4/jquery.min',
        // semantic: '../bower_components/semantic-ui/dist/semantic.min',
        semantic:'http://libs.cncdn.cn/semantic-ui/2.0.1/semantic.min',
        // jqueryui: '../bower_components/jqueryui/jquery-ui.min',
        // nicescroll:'../bower_components/nicescroll/jquery.nicescroll.min',
        // validate:'../bower_components/validation/jqBootstrapValidation',
        angularRoute: '../bower_components/angular-route/angular-route.min',
        // behave:'../bower_components/bootstrap-markdown-editor/js/behave',
        pretty:'../bower_components/pretty/pretty',
        // markdown:'../bower_components/bootstrap-markdown-editor/js/markdown',
        // tomark:'../bower_components/bootstrap-markdown-editor/js/to_markdown',
        // markeditor:'../bower_components/bootstrap-markdown-editor/js/bootstrap-markdown',
        codemirror      : "../bower_components/editor.md/lib/codemirror",
        marked          : "../bower_components/editor.md/lib/marked.min",
        prettify        : "../bower_components/editor.md/lib/prettify.min",
        raphael         : "../bower_components/editor.md/lib/raphael.min",
        underscore      : "../bower_components/editor.md/lib/underscore.min",
        flowchart       : "../bower_components/editor.md/lib/flowchart.min", 
        jqueryflowchart : "../bower_components/editor.md/lib/jquery.flowchart.min", 
        sequenceDiagram : "../bower_components/editor.md/lib/sequence-diagram.min",
        katex           : "../bower_components/editor.md/lib/katex.min",
        editormd        : "../bower_components/editor.md/editormd.amd", // Using Editor.md amd version for Require.js
        showdown        : "../bower_components/showdown/dist/showdown.min",
        // color:'../bower_components/jcrop/js/jquery.color',
        // color:'http://cdn.staticfile.org/jquery-jcrop/0.9.12/js/jquery.color.min',
        // jcrop:'../bower_components/jcrop/js/jquery.Jcrop.min',
        duoshuo:'http://static.duoshuo.com/embed'
        // jcrop:'http://cdn.staticfile.org/jquery-jcrop/0.9.12/js/jquery.Jcrop.min'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularRoute': ['angular'],
        'angularResource':['angular'],
        'semantic': ['jquery'],
        'pretty':{'exports':'pretty'},

        'codemirror':{'exports':'codemirror'},
        'marked':{'exports':'marked'},
        'prettify':{'exports':'prettify'},
        'raphael':{'exports':'raphael'},
        'underscore':{'exports':'underscore'},
        'flowchart':{'exports':'flowchart'},
        'jqueryflowchart':['flowchart'],
        'sequenceDiagram':['raphael'],
        'katex':{'exports':'katex'},
        // 'markdown':{'exports':'markdown'},
        // 'markeditor':['jquery','behave','pretty','markdown','tomark'],
        'editormd':['jquery','marked','prettify','raphael','underscore','flowchart','jqueryflowchart','sequenceDiagram','katex'],
        'showdown':{'exports':'showdown'},
        // 'ueall':['jquery','codemirror','sh'],
        // 'uelan':['ueall'],
        // 'color':['jquery'],
        // 'jcrop':['jquery','color'],
        'duoshuo':['jquery']
    },
    priority: [
        'angular',
        'jquery',
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
    // 'jqueryui',
    'semantic',
    'pretty',
    // 'markdown',
    // 'markeditor',
    'editormd',
    'showdown',
    // 'ueall',
    // 'jcrop',
    'duoshuo',
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
