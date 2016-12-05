'use strict';

define(['angular','pretty','showdown','bshare'], function(angular,pretty,showdown,bshare){

    return angular.module('dl_base.dl_base_controllers', ['base.service'])
	.controller('dlbasectrl',['$rootScope','$scope','$http','$location','$window','$filter','$compile','$routeParams',
        function($rootScope,$scope,$http, $location, $window, $filter,$compile,$routeParams){
        $rootScope.seo={
            pagetitle:"主页",
            des:"Wesson Charles的博客，前端技术，UIUE，和生活琐碎"
        }
        /*
        本ctrl中的所有私有属性
         */
        var _t = this;
        _t.url = $window.url;
        _t.rparam = $routeParams;
        /*
        获取所有文章
         */
        console.log(_t.rparam)
        
        $scope.loadall = function(){
            $http.get("/api/all").success(function(list){
                $rootScope.bloglists = list["list"];
            })
            $http.get("/api/alltags").success(function(data){
                var ts = data["tags"];
                var arr = [];
                if(ts){
                    for(var i=0;i<ts.length;i++){
                        arr = arr.concat(ts[i].tags);
                    }
                }
                var temphash = {},realarr = [];
                for(var i=0;i<arr.length;i++){
                    var flag = arr[i].label?temphash[arr[i].label]:temphash[arr[i]];
                    if(!flag&&realarr.length<16){//前15个
                        if(arr[i].label){
                            temphash[arr[i].label] = true;
                            realarr.push(arr[i].label);
                        }else{
                            temphash[arr[i]] = true;
                            realarr.push(arr[i]);
                        }
                    }
                }
                $rootScope.alltags = realarr;
            })
        }
        $scope.loadall();
        $scope.remove = function(){
        	$http.get("/api/tech/delete").success(function(data){
        		console.log(data);
        		$http.get("/api/tech?type=tech").success(function(list){
        			console.log("...");
        		})
        	})
        }


        /*
        @_explain:右侧各类方法，都将在base controller实现
         */
        /*
        #_detail:右侧分类模块  通过url,来进行查询
         */
        _t.gettypedata = function(cdt){
            $http.get("/api/query?"+cdt).success(function(list){
                $rootScope.bloglists = list["query"];
            })
        }
        if(_t.rparam.query){
            switch(_t.rparam.query){
                case 'tech':
                    _t.gettypedata('type=tech&exclude=ui_ue');
                    break;
                case 'ui-ue':
                    _t.gettypedata('type=tech&subtype=ui_ue');
                    break;
                case 'pic-word':
                    _t.gettypedata('type=life&subtype=pic-word');
                    break;
                default:
                    _t.gettypedata('type=life&subtype=read-and-know');
            }
        }
        if(_t.rparam.tag){
            _t.gettypedata('tag='+_t.rparam.tag);
        }
        
        // $scope.parseHtml= function(str){
        //     console.log(str)
        //     var xmlString = str
        //     , parser = new DOMParser()
        //     , doc = parser.parseFromString(xmlString, "text/xml");
            
        //     return doc;
        // }
        
    }])
    .controller('dlarticlectrl',['$rootScope','$scope','$routeParams','$http','$compile','$timeout','$location',function($rootScope,$scope,$routeParams,$http,$compile,$timeout,$location){
        console.log($routeParams)
        var htmltotext = /<[^>]*>|<\/[^>]*>/gm;
        $rootScope.cover = true;
        var originsum = "";
        if($rootScope.bloglists){//从列表而来
            for(var i=0;i<$rootScope.bloglists.length;i++){
                if($rootScope.bloglists[i]._id == $routeParams.id){
                    $scope.one = $rootScope.bloglists[i];
                    break;
                }
            }
            var it = $scope.one.summary.replace(htmltotext,"");
            originsum = it;
            $rootScope.seo = {
                pagetitle:$scope.one.title,
                des:it
            }
        }else{//从外边来，需要走restful
            console.log("222")
            $http.get("/api/one/"+$routeParams.id).success(function(data){
                $scope.one = data.blog;
                console.log(data.blog)
                var link = $compile('<div onview data-type="maincon" data-content="{{one.content}}"></div>')
                var code = link($scope);
                $("#articlecon").html(code);
                var it = $scope.one.summary.replace(htmltotext,"");
                originsum = it;
                $rootScope.seo = {
                    pagetitle:$scope.one.title,
                    des:it
                }
                
            })
        }

        $scope.share = function(e,p){
            var obj = {
                title: $scope.one.title,
                url: $location.absUrl(),
                summary: originsum,
                pic: $scope.one.thumb
            }
            bShare.addEntry(obj);
            bShare.share(e,p,bShare.entries.length-1)
        }

        $timeout(function(){
            var path = window.location.href;
            if(path.indexOf("#")>-1){
                var domid = path.split("#")[1];
                $('html,body').animate({
                    scrollTop:$("#"+domid)[0].offsetTop
                });
            }else{
                $('html,body').animate({
                    scrollTop:0
                });
            }
            $('pre').each(function(i, block) {
                $(this).addClass("prettyprint");
                // hljs.highlightBlock(block);
              });
        },500)

        $scope.postcom = function(c){
            c["time"] = new Date();
            console.log(c);
            $http.post("/api/article/comment",{id:$scope.one._id,comment:c}).success(function(data){
                if(data.message.code==5){
                    if(!$scope.one.comments)$scope.one.comments = [];
                    $scope.one.comments.push(c);
                }
            })
        }

        $scope.edit = function(blog){
            $location.path("/edit/"+blog._id+"?type="+blog.type);
        }
        $scope.remove = function(blog){
            if(confirm("您确定要删除这篇文章吗？三思啊")){
                $http.delete("/api/article/delete?_id="+blog._id).success(function(data){
                    if(data.code==5){
                        $window.location.href = "/";
                    }
                }) 
            }
        }

        $scope.sharetowechat = function(imgUrl,id,desc,title){
            WeixinJSBridge.invoke('shareTimeline',{ 
                "img_url":imgUrl, 
                //"img_width":"640", 
                //"img_height":"640", 
                "link":"/article/"+id, 
                "desc": desc, 
                "title":title 
            });  
        }
    }])
});