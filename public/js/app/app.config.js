(function() {
  'use strict';

  angular.module('app').config(config, function($mdThemingProvider) {
    $mdThemingProvider.theme('defualt')
      .primaryPalette('teal')
      .accentPalette('brown');

  });




  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'datadash',
        url: '/',
        component: 'datadash',
      })
      .state({
        name: 'about',
        url: '/about',
        component: 'about',
      })
      .state({
        name: 'smsconfigure',
        url: '/smsconfigure',
        component: 'smsConfigure',
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
  }

}());
