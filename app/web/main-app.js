(function() {
  angular.module('app', ['ui.router', 'templates-app']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('/', {
      templateUrl: 'quotes/list.tpl.jade',
      url: '/'
    });
  });

}).call(this);

(function() {
  angular.module("app").controller("SomeCtrl", function() {
    return console.log("SomeCtrl");
  });

}).call(this);
