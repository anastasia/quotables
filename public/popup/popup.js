var path = "http://localhost:3000"
var app = angular.module('popupApp', [])// 
  
  // .config(function($routeProvider){
  //   $routeProvider
  //     .when('/', {
  //       controller  : 'PopupController',
  //       templateUrl : 'popup.html' 
  //     })
  //     .when('/index.html', {
  //       controller  : 'QuoteController',
  //       templateUrl : 'index.html' 
  //     })
  //   })
  .controller('PopupController', ['quoteFactory', '$scope', function (quoteFactory, $scope) {
    $scope.quote = {
      title:null,
      body:null,
      url:null,
      author: null,
      date: new Date()
    };

    $scope.submit = function() {
      console.log($scope.quote)
      // $scope.quote = {
      //   title: title,
      //   body: body,
      //   url:url,
      //   author:author,
      //   date:date
      // };
      quoteFactory.sendQuote($scope.quote);
    }
  }])
  .controller('QuoteController', function ($scope){
    $scope.quotes.on('value', function(all) {
      $scope.allQuotes = all.val();
    });
  });

app.factory('quoteFactory', ['$http', function($http){
  return {
    sendQuote: function(data){
      // console.log(data)
      $http({
        method: 'POST',
        url: path + '/quotes',
        data: JSON.stringify(data)
      }).success(function(data, status, headers){
        console.log(data)
        // window.close();
      }).error(function(data){
        console.log('ERROR ',data)
      });
      // var tags = ($('#quoteTags').val().replace(/,/g, '').split(' ').sort());
    
    },
    separateTags: function(tags, cb) {

    }
  }
}]);