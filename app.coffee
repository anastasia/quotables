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

routes  = require './app/web/routes'
users   = require './app/api/users'
quotes  = require './app/api/quotes'

app = express()
app.set 'port', process.env.PORT || 8000
app.set('views', __dirname + '/app/web/views')
app.use express.static __dirname + '/app/web/views'
app.set 'view engine', 'jade'
app.use bodyParser()
app.use logger('dev')
app.use methodOverride()
app.use session({
  store: new MongoStore({url: 'mongodb://localhost/quotables', auto_reconnect: true}),
  secret: 'very secret secret'
})

passport.use new LocalStrategy(User.authenticate())
passport.use User.createStrategy()
passport.serializeUser User.serializeUser()
passport.deserializeUser User.deserializeUser()

app.use fibrous.middleware
app.use (err, req, res, next) ->
  if err
    res.json(500, {error:err.stack})
  else
    next()

app.get  '/', (req, res) ->
  res.render('index')

app.get '/quotes/new',  quotes.new
app.get '/quotes',      quotes.list
app.post '/quotes/new', quotes.create


app.get  '/users/new',  users.new
app.post '/users/new',  users.create
app.get  '/users/list', users.list


app.get '/crash', (req, res) ->
  res.status(500).send('purposeful crash')

app.listen app.get('port'), ->
  console.log 'listening on port ' + app.get('port')