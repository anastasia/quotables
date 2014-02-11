var app = angular.module('quoteApp', ['ngRoute', 'firebase'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'quoteController',
        templateUrl : 'index.html' 
      })
    })
  .controller('quoteController', function ($scope, $http){
  // $http({
  //     method:'GET',
  //     url: '/',
  //   }).then(function(obj){
  //     $scope.quotes = obj.data;
  //   })

    var $scope.dataRef = new Firebase('https://quotable.firebaseio.com');
    $scope.dataRef.on('value', function(snapshot) {
      console.log('fred’s first name is ' + snapshot.val());
    });
})