(function() {
  'use strict'

  angular.module('app')
    .service('formService', service)

  service.$inject = ['$http'];

  function service($http) {
    this.dinky = 45;
    this.sayHi = function (){
      return "hello service";
    };
    // this.getData = function() {
    //  return $http.get("https://limitless-river-10033.herokuapp.com/data").then(response => {
    //    return response.data
    //  });
    //  }
   }


}());
