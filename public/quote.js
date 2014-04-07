var quoteApp = angular.module('quoteApp', ['ngRoute', 'firebase']);
  
  quoteApp.config(function($routeProvider){
    $routeProvider
      .when('/index.html', {
        controller: 'QuoteController',
        templateUrl : 'index.html' 
      })
    });

  quoteApp.controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase('https://quotable.firebaseio.com/quotes');
    $scope.allQuotes = $firebase($scope.quotes)
  });

  quoteApp.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
        console.log(item)
        if(!(typeof item === "function")){
          filtered.push(item);
        }
      });
      filtered.sort(function (a, b) {
        return (a[field] > b[field]);
      });
      if(reverse) filtered.reverse();
      return filtered;
    };
  });

  // quoteApp.filter('toArray', function () {
  //   // 'use strict';
  //   return function (obj) {

  //     if (!(obj instanceof Object)) {
  //         return obj;
  //     }
  //     return Object.keys(obj).map(function (key) {
  //         // console.log(Object.defineProperty(obj[key])
  //         return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
  //     });
  //   }
// });

// $scope.quotes.on('value', function(all) {
//       $scope.allQuotes = all.val();
//       console.log("in controller", $scope.allQuotes)
//     });