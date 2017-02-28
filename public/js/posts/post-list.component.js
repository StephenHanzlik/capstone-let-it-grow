(function() {
  'use strict';

  angular.module('app')
    .component('postList', {
      require: {
        layout: '^app'
      },
      controller: controller,
      templateUrl: "/js/posts/post-list.template.html"
    })

  controller.$inject = ['$http', '$state'];

  function controller($http, $state) {
    const vm = this

    vm.$onInit = function() {
      $http.get('http://localhost:7000/api/posts').then(function(response) {
        vm.posts = response.data;
        // console.log(vm.posts);
      })
    }

    // $http.patch('http://localhost:7000/api/posts').then(function(response) {
    //
    // })
    vm.addPost = function() {
      if (vm.newPost) {
        vm.newPost.created_at = new Date();
        vm.newPost.vote_count = 0;
        vm.tog += 1;
        vm.newPost.commStatus = false;
        $http.post('http://localhost:7000/api/posts', vm.newPost)
          .then(function(response) {
            vm.posts.push(response.data);
            $state.go('posts');
          })
        // vm.newPost.comments = [];

        //
        // $http.get('http://localhost:7000/api/posts').then(function(response) {
        //   vm.posts = response.data;
        // })
        // delete vm.newPost;
      }
    }

    vm.dropInitVal = "-vote_count";

    vm.dropInitText = "Votes"

    vm.tog = 1;

    vm.toggle = function() {
      vm.tog += 1;
    }

    vm.postComments = function(post) {
      console.log(post);
      $http.post(`/api/posts/${post.id}/comments`, post.comment).then(function(response) {
        post.comments.push(response.data)
        delete post.comment
      })
      // post.comments.push(vm.comment.entry);
      // delete vm.comment.entry;
    }

    vm.upVote = function(obj) {
      obj.vote_count += 1;
    }

    vm.downVote = function(obj) {
      if (obj.vote_count > 0) {
        obj.vote_count -= 1;
      }
    }

  } //end of controller

}());
