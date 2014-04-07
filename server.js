var express    = require('express');
var fs         = require("fs");
var file       = "test.db";
var exists     = fs.existsSync(file);
var sqlite3    = require("sqlite3").verbose();
var db         = new sqlite3.Database(file);
var app        = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});



db.serialize(function(){




})

app.get("/dynamic", function(req, res) {
    var db = new sqlite3.Database(test)
    var posts = []

    db.serialize(function() {
        db.each("SELECT * FROM test", function(err, row) {
            posts.push(row)
        })
    }, function(){
      res.render("dynamic", {title: "Dynamic", posts: posts})
      
    })

})


db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Stuff (thing TEXT)");
  }

  var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

  //Insert random data
  var rnd;
  for (var i = 0; i < 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
  });
});


// db.close();
