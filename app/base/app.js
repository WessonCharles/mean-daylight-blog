'use strict';
// var url = window.location.pathname;
// var load_ctrl_module = url=="/"?"dl_base/dl_base_controllers":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_controllers";
// var load_ctrl_an = url=="/"?"dl_base.dl_base_controllers":"dl_"+url.slice(1,url.length)+".dl_"+url.slice(1,url.length)+"_controllers";
define([
    'angular',
    // 'angularRoute',
    // 'angularResource',
    'dl_base/dl_base_controllers',
    'dl_tech/dl_tech_controllers',
    'dl_add/dl_add_controllers',
    'service',
    'config',
    'directive'
    ], function (angular){
    // Declare app level module which depends on filters, and services
    return angular.module('base', [
        'ngRoute',
        'ngResource',
        'base.service',
        'base.config',
        'base.directive',
        'dl_base.dl_base_controllers',
        'dl_tech.dl_tech_controllers',
        'dl_add.dl_add_controllers'
    ])
    .controller('baseCtrl',['$scope','$http','$rootScope','$route','$location','customExtend',
     function($scope, $http,$rootScope,$route, $location,customExtend) {
        $rootScope.language_switch = function(language){
            $rootScope.language = language;
        }
        $scope.base_tmp='/base/html/body.html';
        if($location.url().split("/")[1]){
            $rootScope.app = $location.url().split("/")[1];    
        }else{
            $rootScope.app = '/';
        }
        $scope.toggleheader = function(){
            $("#header").toggleClass('sticky');
            if($("#header").hasClass('sticky')){
                $("#header").css("margin-bottom","-68px").css("position","relative");
            }else{
                $("#header").css("margin-bottom","45px").css("position","fixed");                
            }
        }

        $scope.frameurl = "http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=2&ptype=1&speed=0&skin=1&isTitle=0&noborder=0&isWeibo=1&isFans=1&uid=2709394993&verifier=8341d7fb&colors=d6f3f7,ffffff,666666,0AA284,F8F9FA&dpc=1";

        jQuery.prototype.serializeObject=function(){//扩展jquery的格式化表单为json的方法
            var obj=new Object();  
            $.each(this.serializeArray(),function(index,param){  
                if(!(param.name in obj)){  
                    obj[param.name]=param.value;  
                }  
            });  
            return obj;  
        };
        $.browser = {};
        $.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
        $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
        $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
        $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

        $rootScope.$on('$locationChangeStart',function(){//每次切换导航时，执行以下选中操作
            var path = window.location.pathname;
            $rootScope.cover = false;
            setTimeout(function(){
                
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
            if(window.location.pathname.indexOf("article")>-1){
                 $rootScope.cover = true;
            }else{
                $rootScope.cover = false;
            }
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
            
            $(document).scroll(function(e){
                $(".carousel-inner > .active > .shade").css("background-position","60% "+(200-$(this).scrollTop()/2)+"px");
                if($(this).scrollTop()==0){
                    $("#header,.slider.main").removeClass("scroll");
                }else{
                    $("#header,.slider.main").addClass("scroll");
                }
            })
          // $(document).ready(function() {
          
            // var nice = $("html").niceScroll({mousescrollstep:100,autohidemode:false});  // The document page (body)
            // $("html").niceScroll().scrollend(function(info){
            //         if(info.current.y>0){
            //             $("#header,.slider.main").addClass("scroll");
            //         }
            //         if(info.current.y==0){
            //             $("#header,.slider.main").removeClass("scroll");
            //         }
            //     });
          // });

        });
    }])
});
