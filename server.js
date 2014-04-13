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
    db.run("create table if not exists quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT(1000), url TEXT(1000), author TEXT(100), title TEXT(200))");
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

/*-----------------------------routes------------------------------------------------*/


app.get('/', function(req, res){
  console.log('AHA! ', req)
  res.render('./popup/popup.html')
  // connection.query('SELECT * FROM Quotes', function(err, rows){
  //   res.render('content', {content : rows});
  // });
});

app.post('/quotes', function(req, res){
  console.log('POSTING TO QUOTES, aaahhhhhh! ', req, res)
  // db.serialize(function() {
  //   db.run("INSERT")
  // }
  res.send(200);
});

app.get('/quotes', function(req, res){
  console.log('HEY THERE ')
  res.send(200);


})
// TODO: users auth, tags

