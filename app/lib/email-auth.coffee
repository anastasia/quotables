fibrous = require 'fibrous'

nev     = require 'email-verification'
User    = require '../db/models/user'
keys    = require '../../keys'

nev.configure
  persistentUserModel: User
  expirationTime: 600
  verificationURL: 'http://localhost:8000/email-verification/${URL}'
  transportOptions:
    service: 'Gmail'
    auth:
      user: keys.GOOGLE_ACCOUNT
      pass: keys.GOOGLE_PASSWORD


nev.generateTempUserModel User

# app.use bodyParser.urlencoded()
# app.get '/', (req, res) ->
#   res.sendFile 'index.html', root: __dirname
#   return
#
