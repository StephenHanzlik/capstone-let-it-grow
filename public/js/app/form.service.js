(function() {
  'use strict'

  angular.module('app')
    .service('formService', service)

  service.$inject = ['$http'];

  function service($http) {
    this.getData = function(){
      return $http.get("http://dinkydinky.herokuapp.com/data").then(response => {
       const data = response.data[0];
       console.log(response.data[0]);
       return data;
     });
   };
  //  this.dinky = this.getData();
   //
  //   this.sayHi = function (){
  //     return "hello service";
  //   };

  }

}());
