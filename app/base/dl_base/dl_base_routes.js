'use strict';

define(['angular', 'app'], function(angular, app) {
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    	$locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'base/dl_base/base.html',
            controller: 'dlbasectrl'
        })
        $routeProvider.when('/article/:id',{
        	
        })
    }]);
});