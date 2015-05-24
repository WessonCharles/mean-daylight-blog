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
			$("#lifetype").dropdown();
			$("#lifesubtype").dropdown();
			$("#ismine").on('change',function(){
				$scope.$apply(function(){
					$scope.blog.ismine = !$scope.blog.ismine;
				})
			});
			$("#lifesubtype").on('change',function(){
				var v = $(this).val();
				$scope.$apply(function(){
					$scope.life.subtype = v;
				})
			});
			UE.getEditor("add_wpreface");
			UE.getEditor("add_wlife");
		});
		$scope.tags = function(e){
            var tagdom = $("#tags");
            if(e.keyCode == 32){
            	var val = $scope.tagstr;
                var a = $('<a class="ui label transition visible" data-value="'+val.split(" ")[0]+'">'+val.split(" ")[0]+'<i class="delete icon"></i></a>');
                tagdom.append(a);
                $scope.tagstr = "";
                $(e.target).css("padding-left",a[0].offsetWidth+50);
            }
            $scope.life.tags = [];
            tagdom.find("a.ui.label").each(function(){
            	$scope.life.tags.push($(this).attr("data-value"));
            })
        }
        $("#tags").delegate("a.ui.label .delete","click",function(){
        	var t = $(this).parent();
        	for(var i =0;i<$scope.life.tags.length;i++){
        		if(t.attr("data-value")==$scope.life.tags[i]){
        			$scope.life.tags.splice(i,1);
        			t.remove();
        			break;
        		}
        	}
        });
		$scope.restore = function(){
			$scope.blog = {ismine:true,type:'tech'};
			$scope.life = {subtype:'pic-word',type:'life'};
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
			$http.post("/api/tech",poststr).success(function(data){
				console.log(data)
			});
		}

		$scope.add_life = function(e){
			$(e.target).find("input,select,textarea").jqBootstrapValidation({autoAdd: {helpBlocks: true}});
			var poststr = "";
			console.log($scope.life)
			for(var p in $scope.life){
				poststr+= p+"="+$scope.life[p]+"&";
			}
			poststr+=$(e.target).serialize();
			// b["content"] = $(e.target).serializeObject().content;
			// console.log(b)
			$http.post("/api/tech",poststr).success(function(data){
				console.log(data)
			});
		}
     })
});            