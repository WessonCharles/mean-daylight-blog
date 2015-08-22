'use strict';

define(['angular'], function(angular){

    return angular.module('dl_base.dl_base_controllers', ['base.service'])
	.controller('dlbasectrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile',
        function($rootScope,$scope,$http, $location, $window, $filter,$compile){
        // console.log($location.url());
        $scope.loadall = function(){
            $http.get("/api/all").success(function(list){
                $rootScope.bloglists = list["list"];
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
    .controller('dlarticlectrl',['$rootScope','$scope','$routeParams','$http','$location',function($rootScope,$scope,$routeParams){
        console.log($routeParams)
        if($rootScope.bloglists){//从列表而来
            for(var i=0;i<$rootScope.bloglists.length;i++){
                if($rootScope.bloglists[i]._id == $routeParams.id){
                    $scope.one = $rootScope.bloglists[i];
                    $scope.one.content = $scope.one.content;
                    break;
                }
            }
        }else{//从外边来，需要走restful

        }
        
    }])
});