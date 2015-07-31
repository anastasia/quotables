express        = require 'express'
path           = require 'path'
logger         = require 'morgan'
methodOverride = require 'method-override'
session        = require 'express-session'
bodyParser     = require 'body-parser'
errorHandler   = require 'errorhandler'
passport       = require 'passport'
LocalStrategy  = require('passport-local').Strategy
MongoStore     = require('connect-mongo')(session)
fibrous        = require 'fibrous'
nev            = require 'email-verification'
keys           = require './keys'

require './app/db/goose'

User      = require './app/db/models/user'
auth      = require './app/lib/auth'
# emailAuth = require './app/lib/email-auth'

# site specific routes
routes  = require './app/server/routes'

# general routes
users   = require './app/api/users'
quotes  = require './app/api/quotes'

app = express()
app.set 'port', process.env.PORT || 8000
app.set('views', __dirname + '/app/web/views')
app.set 'view engine', 'jade'

app.use express.static __dirname + '/app/web'

app.use bodyParser.urlencoded({ extended: false })
app.use bodyParser.json()

app.use logger('dev')
app.use methodOverride()
app.use session({
  store             : new MongoStore({url: 'mongodb://localhost/quotables', autoReconnect: true}),
  secret            : 'very secret secret'
  resave            : false
  saveUninitialized : false
})


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


passport.use new LocalStrategy(User.authenticate())
passport.use User.createStrategy()
passport.serializeUser User.serializeUser()
passport.deserializeUser User.deserializeUser()

app.use passport.initialize()
app.use passport.session()

app.use fibrous.middleware
app.use (err, req, res, next) ->
  if err
    res.json(500, {error:err.stack})
  else
    next()


app.get  '/', routes.renderSite

# app.get  '/signup', routes.createAccount
app.post '/signup', auth.ensureAuth, routes.renderSite
app.post '/login',  passport.authenticate('local'), routes.login
app.get  '/logout', routes.logout

app.get  '/quotes/new',  auth.ensureAuth, quotes.new
app.post '/quotes/new',  auth.ensureAuth, quotes.create
app.get  '/quotes',      auth.ensureAuth, quotes.list

app.get  '/users/new',  users.new
app.post '/users/new',  users.create
app.get  '/users/list', users.list

app.get '/loggedin', routes.isloggedin

app.get '/crash', (req, res) ->
  res.status(500).send('purposeful crash')

app.post '/', (req, res) ->
  email = req.body.email
  # register button was clicked
  try
    if req.body.type == 'register'
      pw = req.body.password
      newUser = new User({email: email, password:pw})
      console.log "newUser", newUser, req.body
      try
        newTempUser = nev.sync.createTempUser(newUser)
      catch e
        console.log "getting newTempUser error",e
      console.log "getting newTempUser", newTempUser
      if newTempUser
        newTempUser.password = newTempUser.generateHash(newTempUser.password)
        nev.registerTempUser newTempUser
        res.json msg: 'An email has been sent to you. Please check it to verify your account.'
        # user already exists in temporary collection!
      else
        res.json msg: 'You have already signed up. Please check your email to verify your account.'

    res.send  'An email has been sent to you. Please check it to verify your account.'
  catch e
    console.log "ERROR",e
    res.send 'An email has been sent to you, yet again. Please check it to verify your account.'

  #   nev.createTempUser newUser, (newTempUser) ->
  #     console.log "newTempUser", newTempUser
  #     # new user created
  #     if newTempUser
  #       # hash the password here
  #       newTempUser.pw = newTempUser.generateHash(newTempUser.pw)
  #       nev.registerTempUser newTempUser
  #       res.json msg: 'An email has been sent to you. Please check it to verify your account.'
  #       # user already exists in temporary collection!
  #     else
  #       res.json msg: 'You have already signed up. Please check your email to verify your account.'
  #
  #   # resend verification button was clicked
  # else
  #   console.log "else"
  #   nev.resendVerificationEmail email, (userFound) ->
  #     if userFound
  #       res.json msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
  #     else
  #       res.json msg: 'Your verification code has expired. Please sign up again.'
  #     return
  # return

# user accesses the link that is sent
app.get '/email-verification/:URL', (req, res) ->
  url = req.params.URL
  console.log "getting url", url
  nev.confirmTempUser url, (user) ->
    console.log "confirmTempUser", user
    if user
      setTimeout ->
        res.redirect '/'
        return
      , 5000
    return
  return







app.listen app.get('port'), ->
  console.log 'listening on port ' + app.get('port')
