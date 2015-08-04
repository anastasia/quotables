angular.module("app")
.controller "LoginCtrl", ($state, AuthService)  ->
  console.log "LOGINCTRL", AuthService
  @user  =
    email : null
    password : null
  @login = ->
    console.log "loginctrl.login", @user
    AuthService
      .login(@user)
      .then ->
        $state.go 'home'
      .catch ->
        $state.go 'login'
  @goToSignupPage = ->
    console.log "goToSignupPage"
    $state.go 'signup'
  return
