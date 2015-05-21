'use strict';

define(['angular','ueall'], function(angular,ueall){
	var editor = new UE.ui.Editor();
    return angular.module('dl_add.dl_add_controllers', [])
	.controller('dladdctrl',function($rootScope,$scope,$http, $location, $window, $filter,$compile){
		$scope.$on("$viewContentLoaded",function(){
			$("#addsth .item").tab();
			UE.getEditor("add_wpreface");
		});
     })
});            