angular.module('app', [
  'ui.router'
  'templates-app'
  'restangular'
])
.config ($stateProvider, $urlRouterProvider) ->

  $urlRouterProvider.otherwise('/home')
  $stateProvider
    .state 'home',
      url : '/home'
      controller: 'MainCtrl'

      views:
        '@':
          templateUrl: 'home.tpl.jade'
        'quotes@home':
          templateUrl: 'quotes/list.tpl.jade'
        'tags@home':
          templateUrl: 'tags/list.tpl.jade'

      resolve:
        quotes: (QuoteService) ->
          QuoteService
            .getQuotes()
            .then ->
              QuoteService
                .populateTags()
