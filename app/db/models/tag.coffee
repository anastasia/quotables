mongoose   = require 'mongoose'
Schema     = mongoose.Schema

Tag = new Schema({
  value:
    type: String
})

module.exports = mongoose.model('Tag', Tag)
