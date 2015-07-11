passport = require 'passport'
fibrous  = require 'fibrous'

exports.ensureAuth = (req, res, next) ->
  user = req.user
  console.log 'ensureAuth req.user?',req.body, req.user
  unless user
    console.log 'redirecting to login'
    return res.redirect '/login'

  if req.isAuthenticated()
    req.logIn user, (err) ->
      return next(err)  if err
      callNext = fibrous -> next()
      callNext (err, val) -> throw err if err