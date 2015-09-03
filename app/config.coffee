keys = require '../keys'
config = {}
if process.env.NODE_ENV == 'production'
  config.MONGO_URL = process.env.MONGOLAB_URI
  config.YAHOO_ACCOUNT  = process.env.YAHOO_ACCOUNT
  config.YAHOO_PASSWORD = process.env.YAHOO_PASSWORD
else
  config.MONGO_URL      = keys.MONGO_URL
  config.YAHOO_ACCOUNT  = keys.YAHOO_ACCOUNT
  config.YAHOO_PASSWORD = keys.YAHOO_PASSWORD

module.exports = config
