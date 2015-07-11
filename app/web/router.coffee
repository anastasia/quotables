angular.module('app', [
  'ui.router'
  'templates-app'
])
.config ($stateProvider, $urlRouterProvider) ->

  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state '/',
      templateUrl: 'quotes/list.tpl.jade'
      url : '/'
