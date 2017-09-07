'use strict';

angular.module('app').controller('dltechctrl',['$rootScope','$scope','$http','$state','$location','$window','$filter','$compile',
		function($rootScope,$scope,$http, $state,$location, $window, $filter,$compile){
		$rootScope.seo = {
			pagetitle:"前端技术分类",
			des:"关于前端的各种技术，html5,css3,angular,nodejs,UI,UE,Ionic"
		}
		console.log("tech_ctrl")
		$scope.loadall = function(page){
			page = page ||1;
			console.log($state.params)
			var apiurl = APIS+"/api/tech";
			var params = "?type=tech&page="+page;
			if($state.params['type']=="html-css"){
				$state.params['type'] = "html_css";
			}
			if($state.params['type']=="javascript"){
				$state.params['type'] = "js";
			}
			if($state.params["type"])params+="&tag="+$state.params["type"];
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
