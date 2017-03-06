(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'mainLanding',
        url: '/',
        component: 'mainLanding',
      })
      .state({
        name: 'signup',
        url: '/signup',
        component: 'signUp',
      })
      .state({
        name: 'loginPage',
        url: '/login',
        component: 'login',
      })
      .state({
        name: 'postList',
        url: '/postList',
        component: 'postList',
      })
      .state({
        name: 'datadash',
        url: '/datadash',
        component: 'datadash',
      })
  }

}());
