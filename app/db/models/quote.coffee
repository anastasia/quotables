mongoose = require 'mongoose'
Schema   = mongoose.Schema

ignoreEmpty = (val) -> if val == "" then return undefined else return val

Quote = new Schema({
  user_id:
    type: Schema.Types.ObjectId
    ref: 'User'
  author:
    type: String
  title:
    type: String
  body:
    type: String
  origin:
    type: String
  tags: [{
    type: Schema.Types.ObjectId
    ref: 'Tag'
    set: ignoreEmpty
  }]
})

module.exports = mongoose.model('Quote', Quote)
