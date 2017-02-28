(function() {
  'use strict'

  angular.module('app')
    .component('login', {
      controller: function(tokenService) {
        const vm = this;
        vm.login = login;
        vm.$onInit = onInit;

        function onInit() {
          if (tokenService.checkToken()) {
            console.log('You are already logged in!');
            $state.go('tabsController.home');
          } else {
            userService.logout();
            console.log('You are not logged in!');
          }
        }

        function login() {

          if (!vm.loginForm.email) {
            window.plugins.toast.showWithOptions({
              message: "Please enter an email",
              duration: "long",
              position: "center",
              addPixelsY: -40
            });
          } else if (!vm.loginForm.password) {
            window.plugins.toast.showWithOptions({
              message: "Please enter an password",
              duration: "long",
              position: "center",
              addPixelsY: -40
            });
          } else {
            userService.login(vm.loginForm.email, vm.loginForm.password)
              .then((res) => {
                console.log('login successful:', res.data);
                console.log('userService:', userService.userData);
                vm.data = userService.userData;

                $state.go('tabsController.home');
              }, (error) => {
                console.log('login failed:', error.data);
                window.plugins.toast.showWithOptions({
                  message: `Login failed: ${error.data}.\n Please try again.`,
                  duration: "long",
                  position: "center",
                  addPixelsY: -40
                });
              });
          }

        }
      },
      // template: `<h1>I am login template</h1>`
      templateUrl: "js/app/login.html"
    });

}());
