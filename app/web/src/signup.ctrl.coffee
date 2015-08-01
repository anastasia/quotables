angular.module("app")
.controller "SignupCtrl", ($state, AuthService, $http)  ->

  generateHash = ->
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
      r = Math.random() * 16 | 0
      v = if c == 'x' then r else r & 0x3 | 0x8
      v.toString 16
    return uuid

  superSecretHash = generateHash()

  @user  =
    email : null
    password : null
    verified : false
    supersecrethash : superSecretHash

  @goToLoginPage = ->
    $state.go 'login'

  @signupUser = ->
    hash = generateHash()
    $http.post('/users/new', @user)
    .success (user) ->
      console.log "user created!"
      return user
    .error (e) ->
      console.log "error creating user"

  @sendConfirmationEmail = ->
    @signupUser()
      .then (obj) ->
        console.log "front end, signupUser", obj.data.user
        user = obj.data.user
        $http.post('/email-verification'
          supersecrethash: user.supersecrethash
          email: user.email)
          .success (data) ->
            console.log "sendConfirmationEmail : getting back somehting?", data
          .error (e) ->
            console.log "sendConfirmationEmail error",  e
  return
