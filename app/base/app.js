'use strict';
// var url = window.location.pathname;
// var load_ctrl_module = url=="/"?"dl_base/dl_base_controllers":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_controllers";
// var load_ctrl_an = url=="/"?"dl_base.dl_base_controllers":"dl_"+url.slice(1,url.length)+".dl_"+url.slice(1,url.length)+"_controllers";
define([
    'angular',
    'dl_base/dl_base_controllers',
    'dl_tech/dl_tech_controllers',
    'dl_add/dl_add_controllers',
    'config'
    ], function (angular){
    // Declare app level module which depends on filters, and services
    return angular.module('base', [
        'ngRoute',
        'base.config',
        'dl_base.dl_base_controllers',
        'dl_tech.dl_tech_controllers',
        'dl_add.dl_add_controllers'
    ])
    .controller('baseCtrl', function($scope, $http,$rootScope,$route, $location) {
        $rootScope.language_switch = function(language){
            $rootScope.language = language;
        }
        $scope.base_tmp='/base/html/body.html';
        if($location.url().split("/")[1]){
            $rootScope.app = $location.url().split("/")[1];    
        }else{
            $rootScope.app = '/';
        }
        jQuery.prototype.serializeObject=function(){//扩展jquery的格式化表单为json的方法
            var obj=new Object();  
            $.each(this.serializeArray(),function(index,param){  
                if(!(param.name in obj)){  
                    obj[param.name]=param.value;  
                }  
            });  
            return obj;  
        };  
        $rootScope.$on('$locationChangeStart',function(){//每次切换导航时，执行以下选中操作
            setTimeout(function(){
                var path = window.location.pathname;
                console.log(path)
                var nav = $("#readable-navbar-collapse");
                var it;
                nav.find("ul li").click(function(){
                    it = $(this);
                    if(it.find(".sub-menu").length>0){
                        nav.find("ul li .sub-menu li").removeClass("active");
                    }   
                })
                nav.find("ul li .sub-menu li").click(function(e){
                    e.stopPropagation();
                    var t = $(this);
                    console.log(t)
                    t.addClass("active");
                })
                nav.find("ul .active").removeClass("active");
                if(path=="/"){
                    it = nav.find("ul li:first");
                    nav.find("ul li:first").addClass("active");
                }else{
                    var href = "/"+path.split("/")[1];
                    it = nav.find("ul li a[href='"+href+"']").parent();
                    it.addClass("active");
                }
                if(it.find(".sub-menu").length>0){
                    nav.find("ul li .sub-menu li a[href='"+path+"']").parent().addClass("active");
                }
                nav.find("ul li").hover(function(){
                    var t = $(this);
                    if(!nav.hasClass("in")&&t.parent().parent().attr("id")=="readable-navbar-collapse"&&it!=t){
                        it.removeClass("active");
                        t.addClass("active");
                        t.find("ul").css("padding-left",t[0].getBoundingClientRect().left);
                    }
                },function(){
                    var t = $(this);
                    if(!nav.hasClass("in")&&t.parent().parent().attr("id")=="readable-navbar-collapse"&&it!=t){
                        t.removeClass("active");
                        it.addClass("active");
                        t.find("ul").css("padding-left",0);
                    }
                });
                
                $("#head-menu").click(function(){
                    nav.toggleClass("in");
                });
            },300)
        })
        $rootScope.$on('locationChangeSuccess', function(){//刷新当前url地址,重新加载本页内容需要重载路由
            $route.reload();
        });
        
        $scope.$on("$viewContentLoaded",function(){//相当于domready
            $("#rebuild_image").dropdown();
            $('.browse').popup({
                inline   : true,
                hoverable: true,
                position : 'bottom left',
                delay: {
                  show: 300,
                  hide: 800
                }
            });
        });
        var htmltotext = /<[^>]*>|<\/[^>]*>/gm;
        var blogreg = /<img[^>]+src="[^"]+"[^>]*>/g;
        var srcreg = /src="([^"]+)"/;
        $rootScope.blogaction = {//博客内容的相关方法
            cutword:function(str,len){//截取指定长度的内容，作为预览显示
                if(!str){
                    return "";
                }
                
                str = str.replace(htmltotext,"");
                var str_len = str.length;
                str = str.substring(0,len);
                if(len < str_len ){
                    str =str+"..." ;
                }
                return str;
            },
            cutimg:function(str,imgs){//截取文字并返回
                if(!str){
                    return "";
                }
                
                imgs = imgs || [];
                if(imgs){
                    var result = str.match(blogreg);
                    if(result){
                        for (var i=0; i<result.length; i++) {            
                            srcreg.exec(result[i]);
                            imgs.push(RegExp.$1);
                        }
                    }
                }
                
                if(imgs.length > 0){        
                    return "<div class='blog_index_img'><img class='blog_img_preview300' src='"+imgs[0]+"'/></div>";
                }
                return "";
            }
        };
        
    })
});
