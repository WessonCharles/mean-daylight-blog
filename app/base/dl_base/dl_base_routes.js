'use strict';

define(['angular', 'app'], function(angular, app) {
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'base/dl_base/base.html',
            controller: 'dlbasectrl'
        })
        $routeProvider.when('/type',{
            templateUrl:'base/dl_base/base.html',
            controller:'dlbasectrl'
        })
        $routeProvider.when('/article/:id',{
        	templateUrl:'base/html/article.html',
            controller:'dlarticlectrl'
        })
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");
    }]);
});