'use strict';

angular.module('app').config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    	$locationProvider.html5Mode(true);
        // $stateProvider.state('default', {
        //   url: '/',
        //   template: '<app-layout></app-layout>',
        //   abstract: true,
        // })
        $stateProvider.state('home', {
          url: '/home',
          templateUrl: 'controllers/dl_base/base.html',
            controller: 'dlbasectrl'
        })
        .state('type', {
          url: '/type',
          templateUrl:'controllers/dl_base/base.html',
            controller:'dlbasectrl'
        })
        .state('articledetail', {
          url: '/article/:id',
          templateUrl:'controllers/html/article.html',
          controller:'dlarticlectrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'controllers/html/login.html',
            controller: 'loginctrl'
        })
        /**
         * 前端
         * @type {String}
         */
        .state('frontend', {
          url: '/front-end',
          templateUrl: 'controllers/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        .state('frontendquery', {
          url: '/front-end/:type',
          templateUrl: 'controllers/dl_tech/tech.html',
            controller: 'dltechctrl'
        })
        /**
         * life
         * @type {String}
         */
        .state('life', {
          url: '/life',
          templateUrl: 'controllers/dl_life/life.html',
            controller: 'dllifectrl'
        })
        .state('lifequery', {
          url: '/life/:type',
          templateUrl: 'controllers/dl_life/life.html',
            controller: 'dllifectrl'
        })
        /**
         * 增加
         * @type {String}
         */
        .state('add', {
          url: '/add',
          templateUrl: 'controllers/dl_add/add.html',
            controller: 'dladdctrl'
        })
        .state('edit', {
          url: '/edit',
          templateUrl: 'controllers/dl_add/add.html',
            controller: 'dleditctrl'
        })
        .state('aboutme', {
          url: '/about-me',
          templateUrl:'controllers/dl_add/about-me.html',
            controller:'dlaboutctrl'
        })
        $urlRouterProvider.otherwise('/home');
    });
