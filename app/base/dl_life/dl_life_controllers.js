'use strict';

define(['angular'], function(angular){

    return angular.module('dl_life.dl_life_controllers', [])
	.controller('dllifectrl',['$rootScope','$scope','$http','$routeParams','$location','$window','$filter','$compile',
		function($rootScope,$scope,$http, $routeParams,$location, $window, $filter,$compile){
		$rootScope.seo = {
			pagetitle:"生活杂谈分类",
			des:"读书，学习分享，闲言碎语"
		}
		console.log("life_ctrl")
		console.log($routeParams)
		var apiurl = "/api/tech";
		var params = "?type=life&page=1";
		if($routeParams["type"])params+="&subtype="+$routeParams["type"];
        $http.get(apiurl+params).success(function(data){
        	$scope.bloglists = data["list"];
        })
    }])
});            