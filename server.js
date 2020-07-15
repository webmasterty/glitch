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

// init sqlite db
const dbFile = "temperature_database.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);





// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});




//handler functions
app.get("/getAllData",(request,response)=>{
  //db.all("SELECT * FROM temperatures WHERE temp_value = (SELECT MAX(temp_value)  FROM temperatures);",(err,rows)=>{
  db.all("SELECT temp_value, temp_year FROM temperatures ORDER BY temp_year;",(err,rows)=>{
    response.send(JSON.stringify(rows));
  });
});

app.get("/getAvgData",(request,response)=>{
  db.all("SELECT AVG(temp_value) AS temp_value FROM temperatures;",(err,rows)=>{
    response.send(JSON.stringify(rows));
  });
});

app.get("/getMaxData",(request,response)=>{
  db.all("SELECT * FROM temperatures WHERE temp_value = (SELECT MAX(temp_value)  FROM temperatures);",(err,rows)=>{
    response.send(JSON.stringify(rows));
  });
});




app.get("/getMinData",(request,response)=>{
  db.all("SELECT * FROM temperatures WHERE temp_value = (SELECT MIN(temp_value)  FROM temperatures);",(err,rows)=>{
    response.send(JSON.stringify(rows));
  });
});



// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});