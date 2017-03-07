(function() {
  'use strict'

  angular.module('app')
    .service('postService', service)

  service.$inject = ['$http']
  function service($http) {

    this.all = all


  }

}());
