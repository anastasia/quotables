var express = require('express');
var app = express();
var mongoose = require('mongoose');

// using https://modulus.io/ database
// mongoose.connect('mongodb://localhost/quotes')
mongoose.connect('mongodb://fred:fred@novus.modulusmongo.net:27017/dOs5ymym') // write localhost, 

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); // log every request to the console // bodyParser creates a ton of temp files, change this later?
  app.use(express.bodyParser()); // pull information from html in POST
  app.use(express.methodOverride()); // simulate DELETE and PUT
});


// create mongoose model to perform all VERBS on 
var Quotable = mongoose.model('Quotable', {
  text : String // just want the text for each To do — mongo automatically generates _id for each
});

// GET
app.get('/quotes/', function(req, res){
  Quotable.find(function(err, quotes){
    if (err){
      res.send(err)
    }
    res.json(quotes);
  });
});

// POST

app.post('/quotes/', function(req, res){
  
  // var quoteObject = {
  //   'title' : req.body.quoteTitle,
  //   'body' : req.body.quoteBody,
  //   'author' : req.body.quoteAuthor,
  //   'tags' : req.body.quoteTags,
  //   'date' : 'date'
  // };

  Quotable.create({
    text : req.body.text,
    done : false 
  }, function(err, todo){
    if(err){
      res.send(err);
    }
    // get all, return newly created
    Quotable.find(function(err, quotes){
      if(err){
        res.send(err);
      }
      res.json(quotes);
    });
  });
});

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

// load popup.html when we go to localhost:8080
app.get('*', function(req, res){
  res.sendfile('./public/popup.html')
})

app.listen(8080);
console.log("App listening, port 8080");
