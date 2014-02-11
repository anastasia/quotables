var app = angular.module('popupApp', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'popupController',
        // template: '<li>hi there</li>' // template goes here
        // or templateUrl, with location, write your html there
        templateUrl : 'popup.html' 
      })
    })
  .controller('popupController', function ($scope, $http){
  $http({
      method:'GET',
      url: '/',
    })

  $scope.quoteObject = {
    'title' : 'title',
    'body' : 'body',
    'author' : 'author',
    'tags' : [],
    'date' : 'date'
  };
// first save quote, then post
  $scope.sendQuote = function(data){
     console.log("in here!")
     return $http({
      method: 'POST',
      url: '/quotes',
      data: data,
    });
  }
// save quote
  $scope.saveQuote = function(){
    $scope.quoteObject.title = $('#quoteTitle').val();
    $scope.quoteObject.body = $('#quoteBody').val();
    $scope.quoteObject.author = $('#quoteAuthor').val();
    $scope.quoteObject.tags = $('#quoteTags').val(); // split, make into an array
    $scope.quoteObject.date = new Date();
    $scope.sendQuote($scope.quoteObject);
    console.log("sending quote");
  };

});

function indexController ($scope, $http){

}
  // $scope.createTodo = function() {
  //   $http.post('/api/todos', $scope.formData)
  //     .success(function(data){
  //       $scope.formData = {}; // clear formdata
  //       $scope.todos = data;
  //       console.log(data);
  //     })   
  //     .error(function(data){
  //       console.log('Error: '+ data);
  //     });
  // };

// GET

// POST
// var postData = function(){
//   jQuery.ajax({
//       type: "POST",
//       url: "popup.html",
//       data: quoteObject,
//       success: function(data) {
//           console.log(data);
//       }, 
//       error: function(data){
//         console.log("error ", data)
//       }
//   }); 
// }
  // $http({
  //   method:'POST',
  //   url: '', // send along data
  //   data: $scope.quoteObject
  // })
// quote object
