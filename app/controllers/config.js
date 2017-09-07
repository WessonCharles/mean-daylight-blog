'use strict';

angular.module('app')
        .config(['$httpProvider','$qProvider', function($httpProvider,$qProvider){
            console.log($httpProvider)
            // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
            // $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
            // $httpProvider.interceptors.push('formsubmit');
            // $httpProvider.responseInterceptors.push('securityInterceptor');
            $qProvider.errorOnUnhandledRejections(false)
            //处理所有弹框响应请求时的操作
        }])
        .config(['$sceDelegateProvider',function($sceDelegateProvider){
                $sceDelegateProvider.resourceUrlWhitelist([/*¿çÓò°×Ãûµ¥*/
                   
                   'self',
                   'http://libs.baidu.com/**',
                   'http://libs.useso.com/**',
                   'http://widget.weibo.com/weiboshow/**',
                   'http://api.chqiangs.com/**']);
                }
        ])
        // });
        
