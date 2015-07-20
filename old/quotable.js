var app = angular.module('quoteApp', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'quoteController',
        templateUrl : 'index.html' 
      })
    })
  .controller('quoteController', function ($scope, $http){
  $http({
      method:'GET',
      url: '/',
    }).then(function(obj){
      $scope.quotes = obj.data;
    })
})

