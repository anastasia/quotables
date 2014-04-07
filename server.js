var express   = require('express');
var app       = express();


app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.get('/', function(req, res){
  res.send(200);
});

app.get('/quotes', function(req, res){
 res.send(200,'quotes');
});

app.post('/quotes', function(req, res){
  var newQuote = new Quotable({
                title: req.body.title,
                body: req.body.body,
                author: req.body.author,
                tags: req.body.tags
  });

  newQuote.save(function(err){
    if(err) throw err;
  }, function(){
    res.send(200, 'sent!');
  });
});
 
app.get('*', function(req, res){
  // res.sendfile('./public/popup.html')
})

app.listen(8080);
console.log('App listening, port 8080');