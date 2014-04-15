var express = require('express');
var fs      = require("fs");
var file    = "test.db";
var exists  = fs.existsSync(file);
var app     = express();
var url     = require('url');
if(!exists) {
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("create table if not exists users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))");
    db.run("create table if not exists quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT(100), title TEXT(200), content TEXT(1000), url TEXT(1000))");
    db.run("create table if not exists tags (id INTEGER PRIMARY KEY AUTOINCREMENT, tag TEXT(200))");
    db.run("create table if not exists quotes_tags (quotes INTEGER, tags INTEGER)");
  }
});

db.close();

app.set('port', 3000);
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));

/*-----------------------------WEBPAGE ROUTES------------------------------------------------*/


app.get('/', function(req, res){
  // send over all data, make availabel to angualr
  var db = new sqlite3.Database(file
  db.run("SELECT * FROM QUOTES")
});


app.get('/quotes', function(req, res){
  res.send(200, 'HEY THERE QUOTES');
});

// TODO: users auth, tags

/*----------------------------- APP ROUTES ------------------------------------------------*/


app.post('/quotes', function(req, res){
  var db = new sqlite3.Database(file);
  db.run("INSERT INTO quotes VALUES (null, '" +  req.body.author + "', '" + req.body.title + "', '" + req.body.content + "', '" + req.body.url +"')");
  // get id of this quote, send with response
  // db.run("SELECT id FROM quotes WHERE content ='" +  req.body.content + "' AND ")
  res.send(200, 'saved');
  res.end();
});
