User         = require '../db/models/user'

exports.new = (req, res) ->
  res.render 'userNew'

exports.list = (req, res) ->
  users = User.sync.find()
  res.redirect 'users/list', {users:users}

exports.create = (req, res) ->
  user = new User {email:req.body.email}
  User.sync.register user, req.body.password
  res.redirect 'users/list'

exports.update = (req, res) ->

exports.delete = (req, res) ->

exports.view   = (req, res) ->