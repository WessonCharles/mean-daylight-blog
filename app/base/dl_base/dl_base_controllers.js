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

        // $scope.parseHtml= function(str){
        //     console.log(str)
        //     var xmlString = str
        //     , parser = new DOMParser()
        //     , doc = parser.parseFromString(xmlString, "text/xml");
            
        //     return doc;
        // }
        
    }])
    .controller('dlarticlectrl',['$rootScope','$scope','$routeParams','$http','$compile','$timeout',function($rootScope,$scope,$routeParams,$http,$compile,$timeout){
        console.log($routeParams)
        $rootScope.cover = true;
        if($rootScope.bloglists){//从列表而来
            for(var i=0;i<$rootScope.bloglists.length;i++){
                if($rootScope.bloglists[i]._id == $routeParams.id){
                    $scope.one = $rootScope.bloglists[i];
                    break;
                }
            }
        }else{//从外边来，需要走restful
            console.log("222")
            $http.get("/api/one/"+$routeParams.id).success(function(data){
                $scope.one = data.blog;
                console.log(data.blog)
                var link = $compile('<div onview data-content="{{one.content}}"></div>')
                var code = link($scope);
                $("#articlecon").html(code);
            })
        }

        $timeout(function(){
            var path = window.location.href;
            if(path.indexOf("#")>-1){
                var domid = path.split("#")[1];
                $('html,body').animate({
                    scrollTop:$("#"+domid)[0].offsetTop
                });
            }
        },500)
    }])
});