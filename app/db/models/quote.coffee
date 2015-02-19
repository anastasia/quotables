mongoose            = require 'mongoose'
Schema              = mongoose.Schema

ignoreEmpty = (val) -> if val == "" then return undefined else return val

Quote = new Schema({
  user_id:
    type: Schema.Types.ObjectId
    ref: 'User'
  author:
    type: String
  content:
    type: Object
    default:
      title:
        type: String
      body:
        type: String
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tags',  set: ignoreEmpty }]
})

module.exports = mongoose.model('Quote', Quote)
