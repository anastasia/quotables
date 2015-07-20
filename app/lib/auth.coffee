passport = require 'passport'
fibrous  = require 'fibrous'

exports.ensureAuth = (req, res, next) ->
  user = req.user
  unless user
    res.send null

  if req.isAuthenticated()
    req.logIn user, (err) ->
      return next(err)  if err
      callNext = fibrous -> next()
      callNext (err, val) -> throw err if err
