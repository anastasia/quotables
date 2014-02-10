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
  $http.get('/')
    .success(function(data){
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
// quote object
  $scope.quoteObject = {
    'title' : 'title',
    'body' : 'body',
    'author' : 'author',
    'tags' : [],
    'date' : 'date'
  };

// save quote
  $scope.saveQuote = function(){
    quoteObject.title = $('#quoteTitle').val();
    quoteObject.body = $('#quoteBody').val();
    quoteObject.author = $('#quoteAuthor').val();
    quoteObject.tags = $('#quoteTags').val(); // split, make into an array
    quoteObject.date = new Date();
    console.log(quoteObject);
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
