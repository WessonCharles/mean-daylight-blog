'use strict';

define(['angular'],function(angular){
	return angular.module('base.directive',[])
	.directive('onview',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(s,e,a){
				console.log(a)
				$timeout(function(){
					$(e).html(a.content)
				})
			}
		}
	}
	])
})