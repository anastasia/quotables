mongoose = require 'mongoose'
Schema   = mongoose.Schema

ignoreEmpty = (val) -> if val == "" then return undefined else return val

Quote = new Schema({
  user_id:
    type: Schema.Types.ObjectId
    ref: 'User'
  content:
    type: Object
    default:
      author: ""
      title: ""
      body: ""
  origin:
    type: String
  tags: [{
    type: Schema.Types.ObjectId
    ref: 'Tag'
    set: ignoreEmpty
  }]
})

module.exports = mongoose.model('Quote', Quote)
