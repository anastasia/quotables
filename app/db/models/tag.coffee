mongoose   = require 'mongoose'
Schema     = mongoose.Schema

Tag = new Schema({
  value:
    type: String
  created_at:
    type: Date
})

module.exports = mongoose.model('Tag', Tag)
