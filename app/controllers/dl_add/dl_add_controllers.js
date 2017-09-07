'use strict';

angular.module('app').controller('dladdctrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile',
		function($rootScope,$scope,$http, $location, $window, $filter,$compile){
		if(!$scope.islogin){
			$window.location.href= "/login";
		}
		$scope.module = "add";
		$scope.techtab = true;
		$scope.lifetab = true;
		// $scope.$on("$viewContentLoaded",function(){
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
		// });
		// 
		$scope.tags = function(e){
            var tagdom = $("#tags");
            if(e.keyCode == 13){
            	var val = $scope.tagstr;
             //    var a = $('<a class="ui label transition visible" data-value="'+val.split(" ")[0]+'">'+val.split(" ")[0]+'<i class="delete icon"></i></a>');
            	// tagdom.append(a);
                $scope.tagstr = "";
                // $(e.target).css("padding-left",a[0].offsetWidth+50);
                if(!$scope.life.tags)$scope.life.tags = [];
                $scope.life.tags.push(val.split(" ")[0]);
            }
        }
        $scope.getblogeditor = function(){
        	var html = '<textarea data-uk-htmleditor="{maxsplitsize:350,markdown:true}" name="content"></textarea>';
        	$("#add_wpreface").html($compile(html)($scope));
        }
        $scope.getblogeditor();
        $scope.getlifeeditor = function(){
        	var html = '<textarea data-uk-htmleditor="{maxsplitsize:350,markdown:true}" name="content"></textarea>';
        	$("#add_wlife").html($compile(html)($scope));
        }
        // $("#tags").delegate("a.ui.label .delete","click",function(){
        // 	var t = $(this).parent();
        // 	for(var i =0;i<$scope.life.tags.length;i++){
        // 		if(t.attr("data-value")==$scope.life.tags[i]){
        // 			$scope.life.tags.splice(i,1);
        // 			t.remove();
        // 			break;
        // 		}
        // 	}
        // });
        $scope.removetag = function(t){
        	for(var i =0;i<$scope.life.tags.length;i++){
        		var lt = $scope.life.tags[i];
        		if(t.label){
        			if(t.label = lt.label){
        				$scope.life.tags.splice(i,1);
	        			break;
        			}
        		}else{
        			if(t==lt){
        				$scope.life.tags.splice(i,1);
	        			break;
        			}
        		}
        	}
        }
		$scope.restore = function(){
			$scope.blog = {ismine:true,type:'tech'};
			$scope.life = {subtype:'pic-word',type:'life'};
		};	
		$scope.restore();
		$scope.addblog = function(e){
			$scope.blog["tags"] = $("#blogtags").val();
			$scope.blog["content"] = $(e.target).parents("form").serializeObject().content;
			console.log($scope.blog)
			$http.post(APIS+"/api/tech",$scope.blog).then(function(data){
				alert("添加成功");
				$scope.restore();
			});
		}

		$scope.add_life = function(e){
			var datas =$(e.target).parents("form").serializeObject();
			for(var d in datas){
				$scope.life[d] = datas[d];
			}
			console.log($scope.life)
			// b["content"] = $(e.target).serializeObject().content;
			// console.log($scope.life)
			$http.post(APIS+"/api/tech",$scope.life).then(function(data){
				console.log(data)
			});
		}

    }])
	.controller('dleditctrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile','$state','$timeout',
		function($rootScope,$scope,$http, $location, $window, $filter,$compile,$state,$timeout){
		if(!$scope.islogin){
			$window.location.href= "/login";
		}
		$scope.getblogeditor = function(content){
        	var html = '<textarea data-uk-htmleditor="{maxsplitsize:350,markdown:true}" name="content">'+content+'</textarea>';
        	$("#add_wpreface").html($compile(html)($scope));
        }

        $scope.getlifeeditor = function(content){
        	var html = '<textarea data-uk-htmleditor="{maxsplitsize:350,markdown:true}" name="content">'+content+'</textarea>';
        	$("#add_wlife").html($compile(html)($scope));
        }
		$http.get(APIS+"/api/one/"+$state.params.id).then(function(data){
			if(data.blog.type=="tech"){
				$scope.techtab = true;
				$scope.lifetab = false;
				$scope.blog = data.blog;
				$scope.getblogeditor($scope.blog.content);
			}else if(data.blog.type=="life"){
				$scope.techtab = false;
				$scope.lifetab = true;
				$scope.life = data.blog;
				$scope.getlifeeditor($scope.life.content);
			}
			console.log(data.blog)

			$timeout(function(){
				$("#addsth .item").tab();
				$("#ismine").checkbox();
				$("#blogtags").dropdown();
				$("#blogtype").dropdown();
				$("#lifetype").dropdown();
				$("#lifesubtype").dropdown();

				var tagarr = [];
				var tas = data.blog.tags;
				console.log(tas)
				for(var i=0;i<tas.length;i++){
					tagarr.push(tas[i].label)
				}
				if($scope.blog)$("#blogtags").dropdown("set selected",tagarr);
				$("#ismine").on('change',function(){
					$scope.$apply(function(){
						if($scope.blog){
							$scope.blog.ismine = !$scope.blog.ismine;
						}else{
							$scope.life.ismine = !$scope.life.ismine;
						}
						
					})
				});
				$("#lifesubtype").on('change',function(){
					var v = $(this).val();
					$scope.$apply(function(){
						$scope.life.subtype = v;
					})
				});
			},0)
			
        })
		$scope.tags = function(e){
            var tagdom = $("#tags");
            if(e.keyCode == 13){
            	var val = $scope.tagstr;
	             $scope.tagstr = "";
	             if(!$scope.life.tags)$scope.life.tags = [];
	             $scope.life.tags.push(val.split(" ")[0]);
	        }
            
        }
        // $("#tags").delegate("a.ui.label .delete","click",function(){
        // 	var t = $(this).parent();
        // 	for(var i =0;i<$scope.life.tags.length;i++){
        // 		if(t.attr("data-value")==$scope.life.tags[i]){
        // 			$scope.life.tags.splice(i,1);
        // 			t.remove();
        // 			break;
        // 		}
        // 	}
        // });
        $scope.removetag = function(t){
        	for(var i =0;i<$scope.life.tags.length;i++){
        		var lt = $scope.life.tags[i];
        		if(t.label){
        			if(t.label = lt.label){
        				$scope.life.tags.splice(i,1);
	        			break;
        			}
        		}else{
        			if(t==lt){
        				$scope.life.tags.splice(i,1);
	        			break;
        			}
        		}
        	}
        }
		// $scope.restore = function(){
		// 	$scope.blog = {ismine:true,type:'tech'};
		// 	$scope.life = {subtype:'pic-word',type:'life'};
		// };	
		// $scope.restore();
		$scope.addblog = function(e){
			
			$scope.blog["tags"] = $("#blogtags").val();
			$scope.blog["content"] = $("#add_wpreface").find("textarea").val();
			console.log($scope.blog)
			$http.post(APIS+"/api/tech/update?_id="+$scope.blog._id,$scope.blog).then(function(data){
				if(data.data.code==5){
					$window.location.href = "/article/"+$scope.blog._id;
				}
			});
		}

		$scope.add_life = function(e){
			var datas =$(e.target).serializeObject();
			for(var d in datas){
				$scope.life[d] = datas[d];
			}
			$scope.life["content"] = $("#add_wlife").find("textarea").val();
			// b["content"] = $(e.target).serializeObject().content;
			console.log("更新了")
			$http.post(APIS+"/api/tech/update?_id="+$scope.life._id,$scope.life).then(function(data){
				if(data.data.code==5){
					$window.location.href = "/article/"+$scope.life._id;
				}
			});
		}

		
    }])
	.controller('dlaboutctrl',['$rootScope',function($rootScope){
		$rootScope.seo={
            pagetitle:"关于我",
            des:"姓名：常惠强"+
				"坐标：北京，石景山"+
				"兴趣：电影/锻炼/看书/旅游"+
				"技术及发展方向：web全栈工程师"+
				"期望：实现自我价值之外有自己的小店"
        }
	}])
