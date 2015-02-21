Quote    = require '../db/models/quote'
exports.new  = (req, res) ->
  res.render "quoteNew"

exports.list = (req, res) ->
  quotes = Quote.sync.find()
  console.log 'getting all quotes', quotes
  res.render 'quotes/list', {quotes:quotes}

exports.create = (req, res) ->
  content = {author:req.body.author, title:req.body.title, body:req.body.body}
  quote = new Quote {content:content,user_id:req.user,origin:req.body.origin}
  try
    quote.sync.save()
    res.status(200)
  catch error
    throw new Error('Error', error.toString())

exports.update = (req, res) ->

exports.delete = (req, res) ->

exports.view   = (req, res) ->