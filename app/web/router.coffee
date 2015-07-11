angular.module('app', [
  'ui.router'
  'templates-app'
])
.config ($stateProvider, $urlRouterProvider) ->

  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state '/',
      # template: """<h3>test</h3><div>heeyy</div>"""
      templateUrl: 'quotes/list.tpl.jade'
      url : '/'
      # controller: ->
      #   console.log 'inside tiny controller'
      # resole:
      #   something: ->
      #     console.log 'in resolve of something'
      # # resolve:
      # get all quotes from server for user


    # TODO: authentication, kick em out if not signed in
