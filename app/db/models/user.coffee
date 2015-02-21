mongoose  = require 'mongoose'
Schema    = mongoose.Schema
passportLocalMongoose = require 'passport-local-mongoose'

User = new Schema({
  email:
    type: String
})

User.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', User)
