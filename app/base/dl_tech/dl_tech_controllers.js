'use strict';

define(['angular'], function(angular){

    return angular.module('dl_tech.dl_tech_controllers', [])
	.controller('dltechctrl',['$rootScope','$scope','$http','$routeParams','$location','$window','$filter','$compile',
		function($rootScope,$scope,$http, $routeParams,$location, $window, $filter,$compile){
		$rootScope.seo = {
			pagetitle:"前端技术分类",
			des:"关于前端的各种技术，html5,css3,angular,nodejs,UI,UE,Ionic"
		}
		console.log("tech_ctrl")
		console.log($routeParams)
		var apiurl = "/api/tech";
		var params = "?type=tech&page=1";
		if($routeParams["type"])params+="&tag="+$routeParams["type"];
        $http.get(apiurl+params).success(function(data){
        	$scope.bloglists = data["list"];
        })
    }])
});            