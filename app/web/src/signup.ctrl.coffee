angular.module("app")
.controller "SignupCtrl", ($state, AuthService, $http)  ->
  console.log "SignupCtrl", AuthService
  @user  =
    email : null
    password : null

  @goToLoginPage = ->
    $state.go 'login'

  @sendConfirmationEmail = ->
    $http.post('/'
      type: 'register'
      email: @user.email
      password: @user.password)
      .success (data) ->
        console.log "sendConfirmationEmail : getting back somehting?", data
      .error (e) ->
        console.log "sendConfirmationEmail error",  e
  return
