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
  
  $scope.sendQuote = function(data){
    var quotations = new Firebase("https://quotable.firebaseio.com/quotes");
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
    $scope.quoteObject.urlOrigin = urlOrigin;
    // URL HERE
    console.log("saving quote, tags: ",$scope.quoteObject.tags );
    $scope.sendQuote($scope.quoteObject);
    // for(var i = 0; i < $scope.quoteObject.tags.length; i++){
    //   $scope.saveTags($scope.quoteObject.tags[i])
    // }
          setTimeout(function(){ $scope.closeWindow() }, 1000);

  };

  var tagsLocation = 'https://quotable.firebaseio.com/tags';

  $scope.saveTags = function(tag){
    var tags = new Firebase(tagsLocation)
    $scope.tag = tags.child(tag);
    $scope.tag.$save(tag);
    
    // $scope.tag = $firebase(tags);
  }

  var tagsExistCallback = function(tag, exists) {
    if (exists) {
      console.log("tag exists")
    } else {
      $scope.saveTags(tag);
    }
  }

  // Tests to see if /users/<userId> has any data. 
  var tagsExist = function(tag) {   
    var tagsRef = new Firebase(tagsLocation);
    tagsRef.child(tag).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      console.log(tagsRef.child(tag))
      tagsExistCallback(tag, exists);
    });
  }
});



