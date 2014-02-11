var app = angular.module('popupApp', ['ngRoute', 'firebase'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'PopupController',
        templateUrl : 'popup.html' 
      })
    })
  .config(function($routeProvider){
    $routeProvider
      .when('/index.html', {
        controller: 'QuoteController',
        templateUrl : 'index.html' 
      })
    })
  .controller('PopupController', function ($scope, $firebase){
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
    };
    
    // close popup after saving
    $scope.closeWindow = function(){
      window.close();
    };

    $scope.tagSeparator = function(tags){
      $scope.tagArr = [];
      tagArr = tags.replace(/,/g, '').split(' ').sort();
    };
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
  })
  .controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase('https://quotable.firebaseio.com');
    $scope.quotes.on('value', function(snapshot) {
      console.log('fred’s first name is ' + JSON.stringify(snapshot.val()));
    });
  });

