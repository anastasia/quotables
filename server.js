var mysql      = require('mysql');
var express    = require('express');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password'
});

connection.connect();
var app = express();

app.set('port', 3000);

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); // log every request to the console // bodyParser creates a ton of temp files, change this later?
  app.use(express.bodyParser()); // pull information from html in POST
  app.use(express.methodOverride()); // simulate DELETE and PUT
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