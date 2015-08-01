mongoose  = require 'mongoose'
Schema    = mongoose.Schema
passportLocalMongoose = require 'passport-local-mongoose'

UserSchema = new Schema({
  email:
    type: String
  verified:
    type: Boolean
  supersecrethash:
    type: String
})

UserSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', UserSchema)
