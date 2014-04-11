var path = "https://quotable.firebaseio.com"
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
  .controller('PopupController', ['quoteFactory', '$scope', '$firebase',  function (quoteFactory, $scope, $firebase) {
    $scope.closeWindow = function() {
      window.close();
    };

    $scope.sendQuote = function(data, cb){
      var quotations = new Firebase(path + '/quotes');
      $scope.quote = $firebase(quotations);
      $scope.quote.$add(data);
      cb()
    };

    $scope.saveQuote = function() {
      quoteFactory.saveQuote(function(data){
        $scope.sendQuote(data, function(){
          // window.setTimeout(function(){
            quoteFactory.saveToTags(data.tags)
            console.log('saved!')
          //     window.close()
          //   },500);
        });
      });
    };
  }])
  .controller('QuoteController', function ($scope, $firebase){
    $scope.quotes = new Firebase(path);
    $scope.quotes.on('value', function(all) {
      $scope.allQuotes = all.val();
    });
  });

app.factory('quoteFactory', ['$firebase', function($firebase){
  return {
    saveQuote: function(cb){
      var tags = ($('#quoteTags').val().replace(/,/g, '').split(' ').sort());
    
      obj = {
        title : title,
        body  : highlighted,
        author: $('#quoteAuthor').val(),
        tags  : tags,
        date  : new Date(),
        url   : url
      }
      cb(obj);
    },
    saveToTags: function(tags, quoteID) {   
      var allTags = new Firebase(path + '/tags');
      console.log(allTags, tags)
      for(var i = 0; i < tags.length; i++) {
        var exists;
        allTags.child(tags[i]).once('value', function(snapshot) {
          exists = (snapshot.val() !== null);
        });
          var tag = $firebase(allTags);
        if(!exists) {
          var toSave = tags[i]
          
          var obj = {toSave:toSave}
          tag.$set(obj);
          tag.$add({toSave:'this'})
          // tags[i] : tags[i]
          //   body: tags[i],
          //   quote_id: quoteID
          // }
          console.log('saving ', toSave)
          // tag.$add(tagObj);
          tag.$save(toSave)
        } else {
          console.log('tag exists!')
        }
      };
    }
  }
}]);





















// var app = angular.module('popupApp', ['ngRoute', 'firebase']);

//   app.config(function($routeProvider){
//     $routeProvider
//       .when('/', {
//         controller: 'PopupController',
//         templateUrl : 'popup.html' 
//       })
//     })
//   app.controller('PopupController', function ($scope, $firebase){
//     $scope.quoteObject = {
//       'title' : 'title', 
//       'body' : 'body',
//       'author' : 'author',
//       'tags' : [],
//       'date' : 'date'
//     };
//     // first save quote, then post
//     $scope.sendQuote = function(data){
//       var quotations = new Firebase("https://quotable.firebaseio.com/quotes");
//       $scope.quote = $firebase(quotations);
//       $scope.quote.$add(data);
//       console.log("IN POPUP INSIDE OF POPUP FOLDER ", data)
//     };
//     // close popup after saving
//     $scope.closeWindow = function(){
//       window.close();
//     };

//     $scope.tagSeparator = function(tags){
//       $scope.tagArr = [];
//       tagArr = tags.replace(/,/g, '').split(' ').sort();
//     };
//     // save quote
//     $scope.saveQuote = function(){
//       $scope.tagSeparator($('#quoteTags').val());
      
//       $scope.quoteObject.title = title;
//       $scope.quoteObject.body = highlighted;
//       $scope.quoteObject.author = $('#quoteAuthor').val();
//       $scope.quoteObject.tags = tagArr; // split, make into an array
//       $scope.quoteObject.date = new Date();
//       $scope.quoteObject.url = url;
//       $scope.quoteObject.urlOrigin = urlOrigin;
//       // URL HERE
//       console.log("saving quote");
//       $scope.sendQuote($scope.quoteObject);
//       tagsExist('bob');
//     };














  //   var tagsLocation = 'https://quotable.firebaseio.com/tags';

  //   $scope.saveTags = function(tag){
  //     var tags = new Firebase(tagsLocation)
  //     $scope.tag = $firebase(tags);
  //     $scope.tag.$add(tag);
  //   }


  //   // Tests to see if /users/<userId> has any data. 
  // });



