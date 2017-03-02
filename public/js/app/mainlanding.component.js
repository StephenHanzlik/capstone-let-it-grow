(function() {
  'use strict'

  angular.module('app')
    .component('mainLanding', {
      controller: function($state, $http) {
        const vm = this

        vm.$onInit = onInit;
        vm.logIn = logIn;

        function onInit() {


        }

        function logIn() {
          $http.post("http://localhost:3000/index/", vm.loginForm)
            .then(function(response) {
              // $state.go('dataDash');
            })
        }
      },
      // otemplate: `<h1>I am template</h1>`

      templateUrl: "js/app/main-landing.html"
    })

}());

// (function() {
//   'use strict';
//
//   angular.module('app')
//     .component('items', {
//       templateUrl: '/js/app/app.template.html',
//       controller: controller
//     })
//
//   controller.$inject = ['$http']
//
//   function controller($http) {
//     const vm = this
//
//     vm.$onInit = onInit
//     vm.deleteItem = deleteItem;
//     vm.editItem = editItem;
//     vm.postItem = postItem;
//
//     vm.dropInitVal = "created_at";
//
//     vm.dropInitText = "Date";
//
//     function onInit() {
//       $http.get("/classifieds")
//         .then(response => {
//           vm.items = response.data;
//           console.log(vm.items);
//         });
//     }
//
//     function editItem(item) {
//       let id = item.id;
//       vm.editPost.id = id;
//       console.log("vm.editPost:");
//       console.log(vm.editPost);
//       $http.patch(`/classifieds/${item.id}`, vm.editPost)
//         .then(response => {
//           vm.items.push(response.data);
//         })
//     }
//
//     function postItem() {
//       let postArr = [];
//       postArr.push(vm.newPost);
//       console.log("vm.newPost:");
//       console.log(vm.newPost);
//       $http.post('classifieds/', vm.newPost)
//         .then(function(response) {
//           vm.items.push(response.data);
//         })
//     }
//
//     function deleteItem(item) {
//       let id = item.id;
//       $http.delete(`/classifieds/${id}`)
//         .then(response => {
//           $http.get("/classifieds")
//             .then(response => {
//               vm.items = response.data;
//               console.log(vm.items);
//             });
//         });
//     }
//
//   }
//
// }());
