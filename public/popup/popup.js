var path    = "http://localhost:3000";
// var sqlite3 = require("sqlite3").verbose();
var file    = "test.db";
var app     = angular.module('popupApp', []) 
  .controller('PopupController', function (quoteFactory, $scope) {
  $scope.submit = function() {

    $scope.quote = { 
      title: $('#quote_title').val(),
      author: $('#quote_author').val(),
      content: $('#quote_body').val(),
      date: new Date() 
    }
    quoteFactory.sendQuote($scope.quote);
  };
})

app.factory('quoteFactory', function($http){
  return {
    sendQuote: function(data){
      $http({
        method: 'POST',
        url: path + '/quotes',
        data: JSON.stringify(data)
      }).success(function(data, status, headers) {
        var tags = ($('#quoteTags').val().replace(/,/g, '').split(' ').sort());
        if(tags.length) {
          for(var i = 0; i < tags.length; i++) {
            $http({
              method: 'POST',
              url: path + '/tags/' + data.body.quote_id,
              data: JSON.stringify(tags[i])
            })
          }
        }
        window.close();
      }).error(function(data){
        console.log('ERROR ',data);
      });
    }
  }
});