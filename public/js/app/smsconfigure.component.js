(function() {
  'use strict'

  angular.module('app')
    .component('smsConfigure', {
      controller: controller,
      templateUrl: "js/app/smsconfigure.template.html"
    })

    controller.$inject = ['formService', '$scope'];

    function controller (formService, $scope) {
      const vm = this;

      vm.smsSettings = smsSettings;
      vm.$onInit = onInit;

      let dinky = formService.getData().then(response => vm.data = response);
      let data = formService.dinky;
      console.log("ctrl logs:");
      // console.log(dinky);
      console.log(data);
      // console.log(vm.data);

      function onInit(){
          let dinky = formService.getData().then(response => $scope.data = response);
          let data = $scope.data;
          console.log("ctrl onInit logs:");
          // console.log(dinky);
          console.log(data);
          console.log($scope.data);
      }

      function smsSettings(){
        let arr = [];
        let arr2 = [];
        let nowArr = [];
        let now = new Date();
        let newString = vm.smsSettingForm.lightsOnInput.toString();
        let newString2 = vm.smsSettingForm.lightsOffInput.toString();
        let nowString = now.toString();
          for(let i = 16; i <= 20; i++){
            if(newString.charAt(i) !== ":"){
              arr.push(newString.charAt(i));
            }
            if(newString2.charAt(i) !== ":"){
              arr2.push(newString2.charAt(i));
            }
            if(nowString.charAt(i) !== ":"){
              nowArr.push(nowString.charAt(i));
            }
          }
          let joinedString = arr.join('');
          let joinedString2 = arr2.join('');
          let joinedNowString = nowArr.join('');
          let currentTime = parseInt(joinedNowString);
          let onTimeInt = parseInt(joinedString, 10);
          let onTimeInt2 = parseInt(joinedString2, 10);
          let postObj = {
            smsLightOn: onTimeInt,
            smsLightOff: onTimeInt2,
            currentTime: currentTime
          }
          console.log(postObj);

          // $http.post("https://limitless-river-10033.herokuapp.com/data", postObj)
          $http.post("https://localhost:3000/data", postObj)
          .then(response => {
              console.log(response);
          });

      }


    }

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
