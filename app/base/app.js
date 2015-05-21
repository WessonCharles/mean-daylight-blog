'use strict';
// var url = window.location.pathname;
// var load_ctrl_module = url=="/"?"dl_base/dl_base_controllers":"dl_"+url.slice(1,url.length)+"/dl_"+url.slice(1,url.length)+"_controllers";
// var load_ctrl_an = url=="/"?"dl_base.dl_base_controllers":"dl_"+url.slice(1,url.length)+".dl_"+url.slice(1,url.length)+"_controllers";
define([
    'angular',
    'dl_base/dl_base_controllers',
    'dl_tech/dl_tech_controllers'
    ], function (angular){
    // Declare app level module which depends on filters, and services
    return angular.module('base', [
        'ngRoute',
        'dl_base.dl_base_controllers',
        'dl_tech.dl_tech_controllers'
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
        $rootScope.$on('$locationChangeStart',function(){
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
        $rootScope.$on('locationChangeSuccess', function(){
            $route.reload();
        });
        
        $scope.$on("$viewContentLoaded",function(){
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
        })  
    })
});
