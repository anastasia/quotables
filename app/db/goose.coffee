mongoose = require('mongoose')

MONGO_URL = 'mongodb://localhost/quotables'

unless mongoose.connection.db
  mongoose.connect(MONGO_URL)
