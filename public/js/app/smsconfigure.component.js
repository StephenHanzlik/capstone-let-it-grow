(function() {
  'use strict'

  angular.module('app')
    .component('smsConfigure', {
      controller: controller,
      templateUrl: "js/app/smsconfigure.template.html"
    })

    controller.$inject = ['formService', '$scope', '$http'];

    function controller (formService, $scope, $http) {
      const vm = this;

      vm.smsSettings = smsSettings;
      vm.$onInit = onInit;

      function onInit(){
          // let promise = formService.getData();
          // promise.then(function(response){
          //   vm.data = response;
          // })
      }


      function smsSettings(){
        let arr = [];
        let arr2 = [];
        let nowArr = [];
        // let now = new Date();
        let newString = vm.smsSettingForm.lightsOnInput.toString();
        let newString2 = vm.smsSettingForm.lightsOffInput.toString();
        // let nowString = now.toString();
          for(let i = 16; i <= 20; i++){
            if(newString.charAt(i) !== ":"){
              arr.push(newString.charAt(i));
            }
            if(newString2.charAt(i) !== ":"){
              arr2.push(newString2.charAt(i));
            }
            // if(nowString.charAt(i) !== ":"){
            //   nowArr.push(nowString.charAt(i));
            // }
          }
          let joinedString = arr.join('');
          let joinedString2 = arr2.join('');
          // let joinedNowString = nowArr.join('');
          // let currentTime = parseInt(joinedNowString);
          let onTimeInt = parseInt(joinedString, 10);
          let onTimeInt2 = parseInt(joinedString2, 10);
          let postObj = {
            on_time: onTimeInt,
            off_time: onTimeInt2,
            max_humid: vm.smsSettingForm.max_humid,
            min_humid: vm.smsSettingForm.min_humid,
            max_temp: vm.smsSettingForm.max_temp,
            min_temp: vm.smsSettingForm.min_temp,
            text_sent: 0
            // currentTime: currentTime
          }
          // console.log(postObj);

          $http.post("https://dinkydinky.herokuapp.com/smssettings", postObj)
          .then(response => {
              console.log(response);
          });

      }


    }

}());
