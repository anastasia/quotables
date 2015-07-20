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

require './app/db/goose'

User = require './app/db/models/user'

auth = require './app/lib/auth'

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

app.get  '/signup', routes.createAccount
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

app.listen app.get('port'), ->
  console.log 'listening on port ' + app.get('port')
