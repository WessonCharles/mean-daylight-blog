/*
 * @Author: wangwenjie
 * @Date:   2016-05-03 14:48:52
 * @Last Modified by:   wangwenjie
 * @Last Modified time: 2016-10-27 14:12:12
 */
'use strict';

window.APIS = "http://api.chqiangs.com";

// 这里只创建模块，不要写逻辑，所依赖的模块可以根据需要裁减
angular.module('app', [
	'ngAnimate', // 动画效果
	'ngCookies', // 在程序中访问Cookie
	'ngSanitize', // 对html内容进行净化，以防范xss等前端攻击
	'ngResource', // 访问REST对象
	'ui.router', // 第三方的路由访问器
	'ui.bootstrap', //bootstrap
]).controller('baseCtrl',['$scope','$http','$rootScope','$state','$location','$timeout',
     function($scope, $http,$rootScope,$route, $location,$timeout) {
        $rootScope.seo={
            pagetitle:"主页",
            des:"Wesson Charles的博客，前端技术，UIUE，和生活琐碎"
        }
        if(window.location.pathname.indexOf("login")>-1){
            $scope.login = true;
        }else{
            $scope.login = false;
        }
        /**
         * 查看是否登陆
         * @param  {[type]} language [description]
         * @return {[type]}          [description]
         */
        if(window.getCookie("chqiangsuser")){
          $rootScope.islogin = true;
        }else{
          $rootScope.islogin = false;
        }
        $rootScope.language_switch = function(language){
            $rootScope.language = language;
        }
        $scope.base_tmp='controllers/html/body.html';
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

        $scope.frameurl = "http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=550&fansRow=1&ptype=1&speed=0&skin=1&isTitle=0&noborder=0&isWeibo=1&isFans=1&uid=2709394993&verifier=8341d7fb&colors=ffffff,ffffff,666666,0082cb,ffffff&dpc=1&_stamp="+new Date().getTime();

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
            $timeout(function(){                
                var nav = $("#readable-navbar-collapse");
                var it;
                
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
             });   
            $rootScope.cover = false;
        })
        $rootScope.$on('$routeChangeSuccess',function(){
            if(window.location.pathname.indexOf("login")>-1){
                $scope.login = true;
            }else{
                $scope.login = false;
            }
            var path = window.location.pathname;
            $timeout(function(){                
                var nav = $("#readable-navbar-collapse");
                var it;
                
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
                        // it.removeClass("active");
                        // t.addClass("active");
                        t.find("ul").css("padding-left",t[0].getBoundingClientRect().left);
                    }
                },function(){
                    var t = $(this);
                    if(!nav.hasClass("in")&&t.parent().parent().attr("id")=="readable-navbar-collapse"&&it!=t){
                        // t.removeClass("active");
                        // it.addClass("active");
                        t.find("ul").css("padding-left",0);
                    }
                });
                
                $("#head-menu").click(function(){
                    nav.toggleClass("in");
                });
            })

        })
        $rootScope.$on('locationChangeSuccess', function(){//刷新当前url地址,重新加载本页内容需要重载路由
            if(window.location.pathname.indexOf("article")>-1){
                 $rootScope.cover = true;
            }else{
                $rootScope.cover = false;
            }
            console.log("看看是为什么")
            // $route.reload();
        });
        
        $scope.$on("$viewContentLoaded",function(){//相当于domready
            bShare.init();
            $("#rebuild_image").dropdown();
            // $('.browse').popup({
            //     inline   : true,
            //     hoverable: true,
            //     position : 'bottom left',
            //     delay: {
            //       show: 300,
            //       hide: 800
            //     }
            // });
            initAudio();
            $(document).scroll(function(e){
                // $(".carousel-inner > .active > .shade").css("background-position","60% "+(200-$(this).scrollTop()/2)+"px");
                if($(this).scrollTop()==0){
                    $("#header,.slider.main").removeClass("scroll");
                }else{
                    $("#header,.slider.main").addClass("scroll");
                }
            });
            $timeout(function(){
                window.prerenderReady = true; 
            },0)
            
        });
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

            /**
             * get popular article
             */
            // $http({url:"http://api.duoshuo.com/sites/listTopThreads.json?short_name=chqiangs",
            //         method:'get',
            //         headers:{'CORS':{'Access-Control-Allow-Origin':'*'}}}).success(function(data){
            //     console.log(data);
            // })
            
        var audio ;
        function initAudio(){
            //audio =  document.createElement("audio")
            //audio.src='Never Say Good Bye.ogg'
            audio = document.getElementById('music');
            // audio.play();
        }

        $scope.play = function(e){
            if(audio.paused){
                audio.play();
                $(event.target).removeClass("fa-pause").addClass("fa-play");
                return;
            }
            audio.pause();
            $(event.target).removeClass("fa-play").addClass("fa-pause");
            
        }
        $scope.stop = function(){
            audio.pause();
            $(event.target).find("i").attr("class","fa fa-play");
        }
        
        
    }])
    .controller('loginctrl',['$scope','$http','$rootScope','$state','$location','$timeout','$window',
        function($scope, $http,$rootScope,$route, $location,$timeout,$window){
            var t = this;
            $scope.login = function(){
                var uname = $(".loginform input[name='username']").val();
                var pass = $(".loginform input[name='code']").val();
                // var tempcode = $("form input[name='code']").val();
                if (uname&&pass){
                    var user_data = {"email": uname, "code": pass};
                    $http.post(APIS+"/api/login",user_data).then(function(data){
                        console.log(data);
                        if(data.data.code==5){
                            console.log("@22")
                            window.setCookie("chqiangsuser",encodeURIComponent(data.data.userinfo.name)+new Date().getTime());
                            $route.go("add");
                        }
                    });
                }
            }
            $scope.sendcode = function(){
                if(!$(".loginform input[name='username']").val()||$(".loginform input[name='username']").val()!='chqiangs@gmail.com'){
                    alert("请输入管理员邮箱");
                    return false;
                }
                $http.post(APIS+"/api/sendcode",{"email":"chqiangs@gmail.com"}).then(function(data){
                    alert(data.data.message.content);
                })
            }
            $scope.ifupperkey = false;
    }])