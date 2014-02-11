var appTwo = angular.module('quoteApp', ['ngRoute', 'firebase']);
  
  appTwo.config(function($routeProvider){
    $routeProvider
      .when('/index.html', {
        controller: 'QuoteController',
        templateUrl : 'index.html' 
      })
    });

  appTwo.controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase('https://quotable.firebaseio.com');
    $scope.quotes.on('value', function(all) {
      $scope.allQuotes = all.val();
      console.log("in controller", $scope.allQuotes)
    });
  });

