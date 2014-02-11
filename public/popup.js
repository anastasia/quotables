 

  // var myApp = angular.module("MyApp", ["firebase"]);
// can't use get requests, have to use event listeners, looking for loaded requests 
// quotations.on('loaded', function(){})
// var fred = new Firebase('https://stites.firebaseio.com/Users/Fred');
//       fred.auth('Eo85u1MXfxVA4udvqIdjnyTYkL51Zz0AFABP962M');
//       item.topic = topic || 'uncategorized';
//       fred.child(Math.round(id)).set(item);
 

var app = angular.module('popupApp', ['ngRoute', 'firebase'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'popupController',
        // template: '<li>hi there</li>' // template goes here
        // or templateUrl, with location, write your html there
        templateUrl : 'popup.html' 
      })
    })
  .controller('popupController', function ($scope, $firebase){
  // $http({
  //     method:'GET',
  //     url: '/',
  //   })

  $scope.quoteObject = {
    'title' : 'title', 
    'body' : 'body',
    'author' : 'author',
    'tags' : [],
    'date' : 'date'
  };
// first save quote, then post
  $scope.sendQuote = function(data){
    console.log("sending quote!", data)
    var quotations = new Firebase("https://quotable.firebaseio.com");
    $scope.quote = $firebase(quotations);
    $scope.quote.$add(data);
  }

  $scope.tagSeparator = function(tags){
    $scope.tagArr = [];
    tagArr = tags.replace(/,/g, '').split(' ').sort();
  }
// save quote
  $scope.saveQuote = function(){
    $scope.tagSeparator($('#quoteTags').val());
    
    $scope.quoteObject.title = title;
    $scope.quoteObject.body = highlighted;
    $scope.quoteObject.author = $('#quoteAuthor').val();
    $scope.quoteObject.tags = tagArr; // split, make into an array
    $scope.quoteObject.date = new Date();
    $scope.quoteObject.url = url;
    // URL HERE
    console.log("saving quote: ", $scope.quoteObject);
    $scope.sendQuote($scope.quoteObject);
  };

});
   // Automatically syncs everywhere in realtime
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
    //  return $http({
    //   method: 'GET',
    //   url: 'http://localhost:8080/quotes',
    //   data: data,
    // });
