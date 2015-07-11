User = require '../db/models/user'

exports.login = (req, res) ->
  res.cookie('ua_session_token', req.user.token)
  res.redirect('/')

exports.createAccount = (req, res) ->
  res.render 'signup'

exports.renderSite = (req, res) ->
  user = req.user
  res.redirect '/login' if !user
  res.render 'index', { user:req.user }

exports.logout = (req, res) ->
  res.clearCookie('ua_session_token')
  req.logout()
  res.redirect '/login'
