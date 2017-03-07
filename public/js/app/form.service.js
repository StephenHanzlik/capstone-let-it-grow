(function() {
  'use strict'

  angular.module('app')
    .service('formService', service)

  service.$inject = ['$http'];

  function service($http) {
    this.getData = function(){
      $http.get("https://limitless-river-10033.herokuapp.com/data").then(response => {
      // return  $http.get("https://localhost:3000/data").then(response => {
          // console.log(response.data);
          // greenTempData = response.data[0].temperature;
          // yellowHumidityData = response.data[0].humidity;
          // let timeString =  response.data[0].created_at;
          // let timeStamp = Date.parse(timeString);
          // vm.lightOn = response.data[0].light;
          return response.data[0];
    })
  }
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
