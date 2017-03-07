(function() {
  'use strict'

  angular.module('app')
    .service('formService', service)

  service.$inject = ['$http'];

  function service($http) {
    this.getData = function(){
      return $http.get("https://limitless-river-10033.herokuapp.com/data").then(response => {
       const data = response.data[0];
       console.log(response.data[0]);
       return data;
     });
   };

    //     return  $http.get("https://limitless-river-10033.herokuapp.com/data").then(response => {
    // //       // console.log(response.data);
    // //       // greenTempData = response.data[0].temperature;
    // //       // yellowHumidityData = response.data[0].humidity;
    // //       // let timeString =  response.data[0].created_at;
    // //       // let timeStamp = Date.parse(timeString);
    // //       // vm.lightOn = response.data[0].light;
    // //       console.log("doinly");
    // //       console.log(response);
    //       let light = response;
    //       return light;
    // })

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
