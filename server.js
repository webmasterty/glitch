// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "LiamQuiz3TableNP.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);


var currentQL=[]
app.locals.currentQL=currentQL;



//check to see whats in the database
db.serialize(() => {
  if (!exists) {
console.log("Database does not exist")
  } else {
    console.log('Database exists');
  }
});



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to process getting 1 question
app.get("/getQ", (request, response) => {
 
  
 // Method B   capture the JSON object 
  db.all("SELECT * from QuizQT", (err, rows) => {
    //app.locals.currentQL=rows;
    console.log(rows)
     response.send(JSON.stringify(rows));
  });

  
});





// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});