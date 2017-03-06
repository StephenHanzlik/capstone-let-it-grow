(function() {
  'use strict'

  angular.module('app')
    .component('smsConfigure', {
      controller: function($state, $http) {
        const vm = this

        // vm.$onInit = onInit;
        vm.smsSettings = smsSettings;


        function smsSettings(){
          let arr = [];
            for(let i = 16; i <= 20; i++){
              let newString = vm.smsSettingForm.lightsOnInput.toString();
              if(newString.charAt(i) !== ":"){
                arr.push(newString.charAt(i));
              }
            }
            let joinedString = arr.join('');
            let onTimeInt = parseInt(joinedString, 10);
            let postObj = {
              smsLight: onTimeInt
            }

            $http.post("https://localhost:3000/data", postObj)
            .then(response => {

            });

        }


      },
      // template: `<h1>I am hardcoded template for dataDash</h1>`

      templateUrl: "js/app/smsconfigure.template.html"
    })

}());



// (function() {
//   'use strict'
//
//   angular.module('app')
//     .component('signUp', {
//       controller: function($state, $http) {
//         const vm = this;
//         vm.signUp = signUp;
//
//         function signUp() {
//           console.log(vm.signupForm);
//           if (!vm.signupForm.Email) {
//             console.log("Invalid Email");
//           } else if (!vm.signupForm.Username) {
//             console.log("Invalid Username");
//           } else if (!vm.signupForm.Password) {
//             console.log("Invalid Password");
//           } else {
//
//             $http.post("http://localhost:3000/users/", vm.signupForm)
//               .then(function(response) {
//                 $state.go('mainLanding');
//               })
//
//
//             // vm.password = vm.signupForm.Password;
//             // userService.makeNew(vm.signupForm.email, vm.signupForm.username, vm.signupForm.password)
//             //   .then(function success(userData) {
//             //     vm.data = userData;
//             //     vm.data.password = vm.password;
//             //     userService.login(vm.data.email, vm.data.password)
//             //       .then((res) => {
//             //         vm.data = res;
//             //         $state.go('tabsController.profile');
//             //       }, (error) => {
//             //         $state.go('tabsController.login');
//             //       });
//             //   }, function error(error) {
//             //     window.plugins.toast.showWithOptions({
//             //       message: `Failed to create user: ${error.data}.\nPlease try again.`,
//             //       duration: "long",
//             //       position: "center",
//             //       addPixelsY: -40
//             //     });
//             //   });
//           }
//         }
//         // vm.$onInit = function() {
//         //   vm.houses = houseService.houses
//         // }
//
//         // vm.addHouse = function() {
//         //   houseService.addHouse(vm.house)
//         //   $state.go('show-house', { id: vm.house.id })
//         // }
//       },
//       // template: `<h1>I am signup template</h1>`
//       templateUrl: "js/app/signup.html"
//     })
//
// }());
