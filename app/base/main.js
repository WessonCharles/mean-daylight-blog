'use strict';

require.config({
    paths: {
        angular: '../bower_components/angular/angular.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        jqueryui: '../bower_components/jqueryui/jquery-ui.min',
        angularRoute: '../bower_components/angular-route/angular-route.min',
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularRoute': ['angular'],
        'jqueryui': ['jquery'],
        'bootstrap': ['jquery', 'jqueryui'],
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
    'angularRoute',
    'jquery',
    'jqueryui',
    'bootstrap',
    'app',
    'dl_base/dl_base_routes',
    'dl_tech/dl_tech_routes'
    ], function(angular, app, routes) {
    angular.element().ready(function() {
        angular.resumeBootstrap(['base']);
    });
});
