'use strict';

define(['angular','ueall','validate'], function(angular,ueall,validate){
	var editor = new UE.ui.Editor();
    return angular.module('dl_add.dl_add_controllers', [])
	.controller('dladdctrl',function($rootScope,$scope,$http, $location, $window, $filter,$compile){
		$scope.$on("$viewContentLoaded",function(){
			$("#addsth .item").tab();
			$("#ismine").checkbox();
			$("#blogtags").dropdown();
			$("#blogtype").dropdown();
			$("#ismine").on('change',function(){
				$scope.$apply(function(){
					$scope.blog.ismine = !$scope.blog.ismine;
				})
			});
			UE.getEditor("add_wpreface");
		});

		$scope.restore = function(){
			$scope.blog = {ismine:true,type:'tech'};
		};	
		$scope.restore();
		$scope.addblog = function(e){
			$(e.target).find("input,select,textarea").jqBootstrapValidation({autoAdd: {helpBlocks: true}});
			var poststr = "";
			console.log($scope.blog)
			for(var p in $scope.blog){
				poststr+= p+"="+$scope.blog[p]+"&";
			}
			poststr+=$(e.target).serialize();
			// b["content"] = $(e.target).serializeObject().content;
			// console.log(b)

				console.log(data)
			});
		}
     })
});            