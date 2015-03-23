'use strict';

define([
    'angular',
    ], function (angular){
    // Declare app level module which depends on filters, and services
    return angular.module('base', [
        'ngRoute',
    ])
    .controller('baseCtrl', function($scope, $http,$rootScope, $route, $location) {
        console.log("111")
        $rootScope.language_switch = function(language){
            $rootScope.language = language;
        }

        $scope.base_tmp='/views/component/body.html';
    })
});
