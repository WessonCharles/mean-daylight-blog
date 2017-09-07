'use strict';

angular.module('app').controller('dllifectrl',['$rootScope','$scope','$http','$state','$location','$window','$filter','$compile',
		function($rootScope,$scope,$http, $state,$location, $window, $filter,$compile){
		$rootScope.seo = {
			pagetitle:"生活杂谈分类",
			des:"读书，学习分享，闲言碎语"
		}
		console.log("life_ctrl");
		$scope.loadall = function(page){
			page = page||1;
			console.log($state.params)
			var apiurl = APIS+"/api/tech";
			var params = "?type=life&page="+page;
			if($state.params["type"])params+="&subtype="+$state.params["type"];
	        $http.get(apiurl+params).then(function(data){
	        	$scope.bloglists = data.data["list"];
	        	$rootScope.page = {
                    pageIndex:page,
                    pageTotal:Math.ceil(list.count/30)
                }
	        })
		}
		$scope.loadall();
		$scope.jumppage = function(p){
            var page = 0;
            if(p=='last'){
                if(!$rootScope.page.pageIndex)$rootScope.page.pageIndex=1;
                page = $rootScope.page.pageIndex-1;
                if(page>0){
                    $scope.loadall(page);
                }
            }
            if(p=='next'){
                if(!$rootScope.page.pageIndex)$rootScope.page.pageIndex=1;
                if(!$rootScope.page.pageTotal)$rootScope.page.pageTotal=1;
                page = $rootScope.page.pageIndex+1;
                if(page>0&&page<=$rootScope.page.pageTotal){
                    $scope.loadall(page);
                }
            }
        }
    }])
