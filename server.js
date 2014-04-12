var express = require('express');
var fs      = require("fs");
var file    = "test.db";
var exists  = fs.existsSync(file);
var app     = express();
if(!exists) {
  console.log("Creating DB file.");
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

// connection.query('USE test_database');
// app.get('/api', function (req, res) {
//   res.send('Our Sample API is up...');
// });


app.get('/', function(req, res){
  connection.query('SELECT * FROM Quotes', function(err, rows){
    res.render('content', {content : rows});
  });
});



app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));