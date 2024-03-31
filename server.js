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

//Skapa nytt inlägg
app.post("/addcourses", (req, res) => {
  //Variabler för input-värden
  let coursecode = req.body.coursecode;
  let coursename = req.body.coursename;
  let progression = req.body.progression;
  let syllabus = req.body.syllabus;
  let err = "";

  //Kontrollera att alla input-fält är ifyllda
  if (
    coursecode != "" &&
    coursename != "" &&
    progression != "" &&
    syllabus != ""
  ) {
    //Lagra i databasen om korrekt
    //Skriver inte in värden direkt i SQL-fråga
    const stmt = db.prepare(
      `INSERT INTO courses (
        coursecode,
        coursename,
        progression,
        syllabus
      )
      VALUES (?, ?, ?, ?);
      `
    );
    //Värden
    stmt.run(coursecode, coursename, progression, syllabus);
    stmt.finalize();
  } else {
    err = "Du måste fylla i alla textfält";
  }

  res.render("addcourses", {
    err: err,
  });
});

//Starta programmet
app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
