'use strict';

define(['angular', 'app'], function(angular, app) {
    return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/life', {
            templateUrl: 'base/dl_life/life.html',
            controller: 'dllifectrl'
        })
        $routeProvider.when('/life/:type', {
            templateUrl: 'base/dl_life/life.html',
            controller: 'dllifectrl'
        })
        //
        // $routeProvider.when('/life/weblog', {
        //     templateUrl: 'base/dl_life/life.html',
        //     controller: 'dllifectrl'
        // })
        // $routeProvider.when('/life/article', {
        //     templateUrl: 'base/dl_life/life.html',
        //     controller: 'dllifectrl'
        // })
        // $routeProvider.when('/life/pic-word', {
        //     templateUrl: 'base/dl_life/life.html',
        //     controller: 'dllifectrl'
        // })
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");
    }]);
});

