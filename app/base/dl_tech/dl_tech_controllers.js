'use strict';

define(['angular'], function(angular){

    return angular.module('dl_tech.dl_tech_controllers', [])
	.controller('dltechctrl',function($rootScope,$scope,$http, $location, $window, $filter,$compile){
        console.log($location.url());
     })
});            