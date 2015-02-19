mongoose            = require 'mongoose'
Schema              = mongoose.Schema

Tag = new Schema({
  name:
    type: String
})

module.exports = mongoose.model('Tag', Tag)
