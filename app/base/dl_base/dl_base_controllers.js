'use strict';

define(['angular'], function(angular){

    return angular.module('dl_base.dl_base_controllers', ['base.service'])
	.controller('dlbasectrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile',
        function($rootScope,$scope,$http, $location, $window, $filter,$compile){
        // console.log($location.url());
        $scope.loadall = function(){
            $http.get("/api/all").success(function(list){
                $scope.blogs = list["list"];
            })
        }
        $scope.loadall();
        $scope.remove = function(){
        	$http.get("/api/tech/delete").success(function(data){
        		console.log(data);
        		$http.get("/api/tech?&type=tech").success(function(list){
        			console.log(list)
        		})
        	})
        }
        
    }])
});