var appTwo = angular.module('quoteApp', []);
  
  appTwo.controller('QuoteController', function ($scope){
    $scope.quotes = [];
    // $scope.allQuotes = $firebase($scope.quotes)
    // $scope.tags = ''
    // $scope.allTags = $firebase($scope.tags)
    // console.log($scope.allTags)
    // $scope.allUniqueTags = [];
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
