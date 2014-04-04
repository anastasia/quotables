var appTwo = angular.module('quoteApp', ['ngRoute', 'firebase']);
  
  appTwo.config(function($routeProvider){
    $routeProvider
      .when('/index.html', {
        controller: 'QuoteController',
        templateUrl : 'index.html' 
      })
    });

  appTwo.controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase('https://quotable.firebaseio.com/quotes');
    $scope.allQuotes = $firebase($scope.quotes)
    $scope.tags = new Firebase('https://quotable.firebaseio.com/tags');
    $scope.allTags = $firebase($scope.tags)
    console.log($scope.allTags)
    $scope.allUniqueTags = [];
  });

  appTwo.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
      var filtered = [];
      angular.forEach(items, function(item) {
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
    // console.log($scope.allQuotes)
  
// $scope.quotes.on('value', function(all) {
//       $scope.allQuotes = all.val();
//       console.log("in controller", $scope.allQuotes)
//     });
// $scope.arrayOfTags = function(someTags){
//   for(var key in someTags[0]){
//     if(typeof someTags[key] !== "function"){
//       if($scope.allUniqueTags.indexOf(someTags[key]) < 0){
//         $scope.allUniqueTags.push(someTags[key])
//         console.log($scope.allUniqueTags)
//       }

//     }
//   }
// }
// $scope.arrayOfTags($scope.allTags)