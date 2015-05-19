'use strict';
// var url = window.location.pathname;
// var load_ctrl_module = url=="/"?"dl_base/dl_base_controllers":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_controllers";
// var load_ctrl_an = url=="/"?"dl_base.dl_base_controllers":"dl_"+url.slice(1,url.length)+".dl_"+url.slice(1,url.length)+"_controllers";
define([
    'angular',
    'dl_base/dl_base_controllers',
    'dl_tech/dl_tech_controllers'
    ], function (angular){
    // Declare app level module which depends on filters, and services
    return angular.module('base', [
        'ngRoute',
        'dl_base.dl_base_controllers',
        'dl_tech.dl_tech_controllers'
    ])
    .controller('baseCtrl', function($scope, $http,$rootScope,$route, $location) {
        $rootScope.language_switch = function(language){
            $rootScope.language = language;
        }
        $scope.base_tmp='/base/html/body.html';
        if($location.url().split("/")[1]){
            $rootScope.app = $location.url().split("/")[1];    
        }else{
            $rootScope.app = '/';
        }
        $rootScope.$on('locationChangeSuccess', function(){
            $route.reload();
        });
    })
});
