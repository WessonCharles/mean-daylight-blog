'use strict';

define(['angular'], function(angular){

    return angular.module('dl_tech.dl_tech_controllers', [])
	.controller('dltechctrl',function($rootScope,$scope,$http, $routeParams,$location, $window, $filter,$compile){
		console.log("tech_ctrl")
		console.log($routeParams)
		var apiurl = "/api/tech";
		var params = "?type=tech&page=1";
		if($routeParams["type"])params+="&subtype="+$routeParams["type"];
        $http.get(apiurl+params).success(function(data){
        	console.log(data)
        })
     })
});            