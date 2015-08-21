'use strict';

define(['angular'],function(angular){
	return angular.module('base.directive',[])
	.directive('simditor',['$timeout',function($timeout){
		return {
			restrict:'A',
			link:function(s,e,a){
				$timeout(function(){
					
				})
			}
		}
	}
	])
})