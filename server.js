var express   = require('express');
var mongoose  = require('mongoose');
var app       = express();

mongoose.connect('mongodb://localhost/app') // write localhost, 

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

// create mongoose model to perform all VERBS on 
var Quotable = mongoose.model('Quotable', {
  'title'  : String,
  'body'   : String,
  'author' : String,
  'tags'   : String,
  createdAt: {
    type: Date, 
    default: Date.now()
  } 
});

// GET
app.get('/', function(req, res){
  res.send(200)
});

app.get('/quotes', function(req, res){
 res.send(200, 'quotes')
});

// app.get('/quotableSite', function(req, res){
//   res.sendfile('/index.html')
// });
// POST /////////////////// create quotes

app.post('/quotes', function(req, res){
  var newQuote    = new Quotable();
  newQuote.title  = req.body.title;
  newQuote.body   = req.body.body;
  newQuote.author = req.body.author;
  newQuote.tags   = req.body.tags;

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

// DELETE
// app.delete('', function(req, res){
//   Quotable.remove({
//     _id : req.params.popup_id
//   }, function(err, todo){ // err, data
//     if(err){
//       res.json(err);
//     }

//     Quotable.find(function(err, quotes){
//       if(err){
//         res.send(err);
//       }
//       res.json(quotes)
//     });
//   });
// });

