mongoose  = require 'mongoose'
Schema    = mongoose.Schema
bcrypt   = require 'bcrypt'
passportLocalMongoose = require 'passport-local-mongoose'

UserSchema = new Schema({
  email:
    type: String
})


UserSchema.methods.generateHash = (password) ->
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

UserSchema.methods.validPassword = (password) ->
  return bcrypt.compareSync(password, this.pw)

UserSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('User', UserSchema)
