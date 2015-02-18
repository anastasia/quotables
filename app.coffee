express   = require('express')
app       = express()


app.use(express.static(__dirname + '/public'))
# app.use(express.logger('dev'))
# app.use(express.bodyParser())
# app.use(express.methodOverride())


app.get '/', (req, res) ->
  res.send(200)


app.get '/quotes', (req, res) ->
 res.send(200,'quotes');


app.post '/quotes', (req, res) ->
  newQuote = new Quotable({
    title: req.body.title
    body: req.body.body
    author: req.body.author
    tags: req.body.tags
  })

  # // newQuote.save((err){
  # //   if(err) throw err;
  # // } (){
  res.send 200

app.get '*', (req, res) ->
  res.send 'what'
  # // res.sendfile('./public/popup.html')


app.listen(8080)
console.log('App listening, port 8080')