angular.module('app', [
  'ui.router'
  'templates-app'
  'restangular'
])
.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise ($injector, $location) ->
    GuardService = $injector.get 'GuardService'
    GuardService.redirect()

  $urlRouterProvider.when '', (GuardService) ->
    GuardService.redirect()

  $stateProvider
    .state 'home',
      url : '/list?tags'
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
    .state 'login',
      url : '/login'
      templateUrl: 'login.tpl.jade'

.run ($rootScope, GuardService) ->
  $rootScope.$on '$stateChangeStart', GuardService.stateChange

.service 'GuardService', ($state, AuthService)->
  guards =
    redirect: ->
      AuthService
        .isLoggedIn()
        .then ->
          $state.go 'home'
        .catch ->
          $state.go 'login'

    stateChange: (event, toState, toParams) ->
      return if toState.name == "login"
      return if AuthService.loggedInUser
      event.preventDefault()
      AuthService
        .isLoggedIn()
        .then ->
          $state.go toState.name
        .catch ->
          $state.go 'login'



.service 'AuthService', ($q, $http) ->
  obj =
    startSession: (user) ->
      @loggedInUser = user

    endSession: ->
      @loggedInUser = null

    login: (user) ->
      deferred = $q.defer()
      $http.post('/login',
        email: user.email
        password: user.password)
      .then =>
        @startSession user
        deferred.resolve user
      .catch =>
        @endSession()
        deferred.reject 'user is not logged in'

      deferred.promise


    loggedInUser: {}
    isLoggedIn: ->
      deferred = $q.defer()
      $http.get('/loggedin')
        .then (res) =>
          @loggedInUser = res.data.user
          deferred.resolve res.data.user
        .catch =>
          @loggedInUser = null
          deferred.reject  'user is not logged in'

      deferred.promise
