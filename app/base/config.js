'use strict';

define(['angular'/*, 'services'*/], function(angular){

    return angular.module('base.config', [/*'base.services'*/])
        .config(['$httpProvider', function($httpProvider){
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            // $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
            // $httpProvider.interceptors.push('formsubmit');
            // $httpProvider.responseInterceptors.push('securityInterceptor');

            //处理所有弹框响应请求时的操作
            var $http,
            interceptor = ['$q', '$injector', function ($q, $injector) {
                var error;

                function success(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                    }
                    /*防止重复提交*/
                    if(response.config.method=="POST"||response.config.method=="PUT"){
                      if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"
                        &&$("#page-wrapper").find(".modal:visible").attr("id")!="createhost"){
                          $("#page-wrapper").find(".modal:visible").find(".load-respond").remove();
                        if($("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").length>0){
                            $("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").css("width","0")
                        }
                      }
                      setTimeout(function(){
                        if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"&&
                          $("#page-wrapper").find(".modal:visible").attr("id")!="createhost"){
                          $("#page-wrapper").find(".modal:visible").modal("hide");    
                        }
                      },200)
                      
                    }
                    return response;
                }

                function error(response) {
                    // get $http via $injector because of circular dependency problem
                    $http = $http || $injector.get('$http');
                    if($http.pendingRequests.length < 1) {
                    }
                    if(response.config.method=="POST"||response.config.method=="PUT"){
                      if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"){
                          $("#page-wrapper").find(".modal:visible").find(".load-respond").remove();
                          if($("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").length>0){
                              $("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").css("width","0")
                          }
                      }
                      setTimeout(function(){
                        if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"){
                          $("#page-wrapper").find(".modal:visible").modal("hide");    
                        }
                      },200)
                      
                    }
                    return $q.reject(response);
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }];

          $httpProvider.responseInterceptors.push(interceptor);
        }])
        // .provider('securityInterceptor', function() {
        //     this.$get = function($location, $q) {
        //       return function(promise) {
        //         return promise.then(null, function(response) {
        //           console.log("请求执行了")
        //           console.log(response)
        //           if(response.data.error&&response.data.error.message=="Invalid user / password"){
        //               Opstack.showStatus("登录名或密码错误",3);
        //           }else if(response.status === 403 || response.status === 401) {
        //             window.location.href = "/login";//暂时先跳转到首页
        //             // $location.path('/');
        //           }else if(response.status===500 || response.status===503){
        //               $("#page-wrapper").find(".modal:visible").modal("hide");
        //               var who = "";
        //               if(response.config.url.indexOf("compute")>-1||response.config.url.indexOf("cmdb")>-1){
        //                 who = "继伟";
        //               }
        //               if(response.config.url.indexOf("game")>-1){
        //                 who = "曹正";
        //               }
        //               Opstack.showStatus("很遗憾，后端挂了！请找："+who,6);
        //           }
        //           return $q.reject(response);
        //         });
        //       };
        //     };
        // });
        
});
