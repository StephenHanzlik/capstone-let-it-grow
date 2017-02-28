(function() {
  'use strict'

  angular.module('app')
    .component('login', {
      controller: function(houseService) {
        const vm = this

        vm.$onInit = function() {
          vm.houses = houseService.houses
        }
      },
      // template: `<h1>I am login template</h1>`
      templateUrl: "js/app/login.html"
    });

}());
