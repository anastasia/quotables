fibrous = require 'fibrous'
Quote   = require '../db/models/quote'
Tag     = require '../db/models/tag'
User    = require '../db/models/user'
exports.new  = (req, res) ->
  res.render "quotes/new"

exports.list = (req, res) ->
  quotes = Quote.find( { user_id : req.user._id } ).populate('tags').sync.exec()
  res.json quotes

exports.create = (req, res) ->
  try
    quote = new Quote({
      author  : req.body.author
      body    : req.body.body
      title   : req.body.title
      user_id : req.user._id
      origin  : req.body.url
      created_at : new Date()
    })

    tagString = req.body.tags
    tagsArray = tagString?.split(/[\s,]+/)

    for tagVal in tagsArray
      tag = Tag.sync.findOne { value : tagVal }
      tag = new Tag { value : tagVal } if !tag

      tag.sync.save()
      quote.tags.push tag._id
    quote.sync.save()
    res.status(200).send({status:"success!", quote:quote})

  catch error
    res.status(500).send({error:error})

exports.update = (req, res) ->
  quote = Quote.sync.findById req.body.id
  quote[req.body.field] = req.body.update
  quote.sync.save()
  res.status(200).send({status:"success!"})

exports.delete = (req, res) ->

exports.view   = (req, res) ->
