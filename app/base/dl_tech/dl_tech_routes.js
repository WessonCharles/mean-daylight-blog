'use strict';

define(['angular', 'app'], function(angular, app) {
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    	$locationProvider.html5Mode(true);
        $routeProvider.when('/tech', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/html-css', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/javascript', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/angularjs', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/nodejs', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/mongodb', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        $routeProvider.when('/tech/ionic', {
            templateUrl: 'base/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
    }]);
});
