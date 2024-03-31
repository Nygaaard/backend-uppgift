//CV
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

//Anslut till databas
const db = new sqlite3.Database("./db/cv.db");

//Inställningar
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/addcourses", (req, res) => {
  res.render("addcourses");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//Starta programmet
app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
