Quote = require '../db/models/quote'
exports.new  = (req, res) ->
  res.render "quotes/new"

exports.list = (req, res) ->
  quotes = Quote.sync.find({user_id:req.user._id})
  res.render 'quotes/list', {quotes:quotes}

exports.create = (req, res) ->
  content = {author:req.body.author, title:req.body.title, body:req.body.body}
  quote = new Quote {content:content,user_id:req.user._id,origin:req.body.origin}
  quote.sync.save()
  res.redirect '/quotes/list'

exports.update = (req, res) ->

exports.delete = (req, res) ->

exports.view   = (req, res) ->