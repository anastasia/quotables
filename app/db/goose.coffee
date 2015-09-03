config = require '../config'
mongoose = require 'mongoose'

MONGO_URL = config.MONGO_URL

unless mongoose.connection.db
  mongoose.connect(MONGO_URL)
