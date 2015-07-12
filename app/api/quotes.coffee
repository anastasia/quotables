fibrous = require 'fibrous'
Quote   = require '../db/models/quote'
Tag     = require '../db/models/tag'

exports.new  = (req, res) ->
  res.render "quotes/new"

exports.list = (req, res) ->
  quotes = Quote.find( { user_id : req.user._id } ).populate('tags').sync.exec()
  res.json quotes

exports.create = (req, res) ->
  try
    content =
      author : req.body.author
      body   : req.body.body

    quote = new Quote {
      content : content
      user_id : req.user._id
      origin  : req.body.origin
    }
    # TODO: remove!
    tags = ["fake", "test", "array", "tags"]

    for singleTag in tags
      tag = Tag.sync.findOne { value : singleTag }
      tag = new Tag { value : singleTag } if !tag

      tag.sync.save()
      quote.tags.push tag._id

    quote.sync.save()

  catch error
    res.send 500, {error:error}
  res.redirect '/'

exports.update = (req, res) ->

exports.delete = (req, res) ->

exports.view   = (req, res) ->
