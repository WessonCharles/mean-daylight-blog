'use strict';

define(['angular', 'app'], function(angular, app) {
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    	$locationProvider.html5Mode(true);
        $routeProvider.when('/add', {
            templateUrl: 'base/dl_add/add.html',
            controller: 'dladdctrl'
        })
        $routeProvider.when('/edit',{
        	templateUrl:'base/dl_add/add.html',
        	controller:'dleditctrl'
        })
        $routeProvider.when('/about-me',{
            templateUrl:'base/dl_add/about-me.html',
            controller:'dlaboutctrl'
        })
    }]);
});
