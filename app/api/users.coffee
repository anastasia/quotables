User = require '../db/models/user'

exports.new = (req, res) ->
  res.render 'users/new'

exports.list = (req, res) ->
  users = User.sync.find()
  res.render 'users/list', {users:users}

exports.create = (req, res) ->
  user = new User {
    email:req.body.email
    verified: false
    supersecrethash: req.body.supersecrethash
  }
  User.sync.register user, req.body.password
  res.status(200).send({user:user})

exports.update = (req, res) ->

exports.delete = (req, res) ->

exports.view   = (req, res) ->
