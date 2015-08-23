'use strict';

define(['angular'/*, 'services'*/], function(angular){

    return angular.module('base.config', [/*'base.services'*/])
        .config(['$httpProvider', function($httpProvider){
            // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
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
        .config(['$sceDelegateProvider',function($sceDelegateProvider){
                $sceDelegateProvider.resourceUrlWhitelist([/*¿çÓò°×Ãûµ¥*/
                   
                   'self',
                   'http://libs.baidu.com/**',
                   'http://libs.useso.com/**',
                   'http://widget.weibo.com/weiboshow/**']);
                }
        ])
        // });
        
});
