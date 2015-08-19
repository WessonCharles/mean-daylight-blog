'use strict';

define(['angular'], function(angular){

    return angular.module('dl_base.dl_base_controllers', [])
	.controller('dlbasectrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile',
        function($rootScope,$scope,$http, $location, $window, $filter,$compile){
        // console.log($location.url());
        $scope.loadall = function(){
            
        }
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