var mysql      = require('mysql'),
    express    = require('express'),
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password'
    });

var app = module.exports = express.createServer();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Our Sample API is up...');
});


app.get('/user/:id', function (req, res){
        connection.connect();
        connection.query('SELECT * FROM users where id ='+req.params.id,
            function (error, rows, fields) {
                      res.writeHead(200, {'Content-Type': 'text/plain'});
                  		if(!rows.length) {
                    		res.end( 'no such record found...');
                    		//break;
                  		} else {
                    		var ans = 'User is '+ rows[0].username +'\n';
                    		res.end(ans);
                  		}});
      connection.end();
});


connection.query('CREATE DATABASE IF NOT EXISTS quotables', function (err) {
    if (err) throw err;
    connection.query('USE quotables', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(100)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });

    connection.query('USE quotables', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS quotes('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'body VARCHAR(1000) NOT NULL,'
            + 'author VARCHAR(100),'
            + 'created TIMESTAMP DEFAULT 0000-00-00 00:00:00'
            + 'updated TIMESTAMP DEFAULT NOW() on update NOW()'
            + 'tags'
            +  ')', function (err) {
                if (err) throw err;
            });
    });

    connection.query('USE quotables', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS tags('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(100)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });

});


app.listen(8080);
