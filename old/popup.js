var app = angular.module('popupApp', ['ngRoute', 'firebase'])// 
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller  : 'PopupController',
        templateUrl : 'popup.html' 
      })
      .when('/index.html', {
        controller  : 'QuoteController',
        templateUrl : 'index.html' 
      })
    })
  .controller('PopupController', ['$scope', '$firebase', 'sendQuotes', function ($scope, $firebase, sendQuotes) {
    $scope.quoteObject = {
      'title'  : 'title', 
      'body'   : 'body',
      'author' : 'author',
      'tags'   : [],
      'date'   : 'date'
    };
    // close popup after saving
    $scope.closeWindow = function(){
      window.close();
    };

    // save quote
    $scope.saveQuote = function(){

      tagArr = ($('#quoteTags').val().replace(/,/g, '').split(' ').sort());
      
      $scope.quoteObject = {
        title : title,
        body  : highlighted,
        author: $('#quoteAuthor').val(),
        tags  : tagArr,
        date  : new Date(),
        url   : url
      }

      console.log("saving quote: ", $scope.quoteObject);
      $scope.sendQuote($scope.quoteObject);
    };
  }])
  .controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase('https://quotable.firebaseio.com');
    $scope.quotes.on('value', function(all) {
      console.log(all.val())
      $scope.allQuotes = all.val();
    });
  });

app.factory('sendQuotes', ['$firebase', '$scope', function($firebase, $scope){
    return {
      sendQuote: function(data){
        console.log("sending quote!", data)
        var quotations = new Firebase("https://quotable.firebaseio.com");
        $scope.quote = $firebase(quotations);
        $scope.quote.$add(data);
      };
    };    

}])