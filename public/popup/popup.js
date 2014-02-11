var app = angular.module('popupApp', ['ngRoute', 'firebase']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'PopupController',
        templateUrl : 'popup.html' 
      })
    })
  app.controller('PopupController', function ($scope, $firebase){
    $scope.quoteObject = {
      'title' : 'title', 
      'body' : 'body',
      'author' : 'author',
      'tags' : [],
      'date' : 'date'
    };
    // first save quote, then post
    $scope.sendQuote = function(data){
      var quotations = new Firebase("https://quotable.firebaseio.com");
      $scope.quote = $firebase(quotations);
      $scope.quote.$add(data);
      console.log("sending data ", data)
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
      console.log("saving quote");
      $scope.sendQuote($scope.quoteObject);
    };
  });