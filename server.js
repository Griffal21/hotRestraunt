var express = require("express");
var path = require("path");
var connection = require("./db/connection");

// Initialize an express app
var app = express();
var PORT = process.env.PORT || 3000;

// Configure the express app to accept JSON from the client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Renders the home page
app.get("/", function(req, res) {
  console.log("Going to page:" + __dirname);
  console.log(path.join(__dirname, "./html/home.html"));

  res.sendFile(path.join(__dirname, "./html/home.html"));
});

//render reservation page
app.get("/reserve", function(req, res) {
  console.log("Going to page:" + __dirname);
  console.log(path.join(__dirname, "./html/reserve.html"));

  res.sendFile(path.join(__dirname, "./html/reserve.html"));
});

//reders
app.get("/tables", function(req, res) {
  console.log("Going to page:" + __dirname);
  console.log(path.join(__dirname, "./html/tables.html"));

  res.sendFile(path.join(__dirname, "./html/tables.html"));
});

//connect to database
app.get("/api/tables", function(req, res) {
connection.query("SELECT * FROM tables", function(err, dbResult) {
  res.json(dbResult);
  if (err) throw err;
});
});

//add reservations to table
app.post("/api/tables", function(req, res) {
  console.log("req.body:", req.body);

  connection.query("INSERT INTO tables SET ?", req.body, function(err, result) {
    if (err) throw err;

    res.json(result);
  });
});


app.listen(PORT, function() {
  console.log("port listen")
});