var express = require('express');
var fs      = require("fs");
var file    = process.env.CLOUD_DIR + "/" + "test.db";
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
    db.run("CREATE TABLE Users (user_id INTEGER UNIQUE NOT NULL PRIMARY KEY, name VARCHAR(20))");
    db.run("CREATE TABLE Quotes (quote_id INTEGER UNIQUE NOT NULL PRIMARY KEY, content VARCHAR, author VARCHAR, title VARCHAR, url VARCHAR)");
    db.run("CREATE TABLE Tags (tag_id INTEGER UNIQUE NOT NULL PRIMARY KEY, tag VARCHAR(20), user_id)");
    db.run("CREATE TABLE Quotes_Tags (tag_id, quote_id)");
  }

  var stmt = db.prepare("INSERT INTO Users VALUES (?)");

  //Insert random data
  var rnd;
  for (var i = 0; i &lt; 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd);
  }

  stmt.finalize();
  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
  });
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
  connection.query('SELECT * FROM users', function(err, rows){
    res.render('users', {users : rows});
  });
});


// app.get('/user/:id', function (req, res){
//         connection.connect();
//         connection.query('SELECT * FROM users where id ='+req.params.id,
//             function (error, rows, fields) {
//                       res.writeHead(200, {'Content-Type': 'text/plain'});
//                   		if(!rows.length) {
//                     		res.end( 'no such record found...');
//                     		//break;
//                   		} else {
//                     		var ans = 'User is '+ rows[0].username +'\n';
//                     		res.end(ans);
//                   		}});
//       connection.end();
// });


// connection.query('CREATE DATABASE IF NOT EXISTS quotables', function (err) {
//     if (err) throw err;
//     connection.query('USE quotables', function (err) {
//         if (err) throw err;
//         connection.query('CREATE TABLE IF NOT EXISTS users('
//             + 'id INT NOT NULL AUTO_INCREMENT,'
//             + 'PRIMARY KEY(id),'
//             + 'name VARCHAR(100)'
//             +  ')', function (err) {
//                 if (err) throw err;
//             });
//     });

//     connection.query('USE quotables', function (err) {
//         if (err) throw err;
//         connection.query('CREATE TABLE IF NOT EXISTS quotes('
//             + 'id INT NOT NULL AUTO_INCREMENT,'
//             + 'PRIMARY KEY(id),'
//             + 'body VARCHAR(1000) NOT NULL,'
//             + 'author VARCHAR(100),'
//             + 'created TIMESTAMP DEFAULT 0000-00-00 00:00:00,'
//             + 'updated TIMESTAMP DEFAULT NOW() on update NOW()'
//             +  ')', function (err) {
//                 if (err) throw err;
//             });
//     });

    // connection.query('USE quotables', function (err) {
    //     if (err) throw err;
    //     connection.query('CREATE TABLE IF NOT EXISTS tags('
    //         + 'id INT NOT NULL AUTO_INCREMENT,'
    //         + 'PRIMARY KEY(id),'
    //         + 'name VARCHAR(100)'
    //         +  ')', function (err) {
    //             if (err) throw err;
    //         });
    // });

// });
app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));