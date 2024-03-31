//Installerings-script för kurshanteringssida
//Av Andreas Nygård

//För att köra detta script - skriv kommandot "npm run install" i terminal

const sqlite3 = require("sqlite3").verbose();

//Skapa ny databas
//Döper den till "cv" och lägger i mappen "db".
const db = new sqlite3.Database("./db/cv.db");

//Skapa tabellen för databasen
db.serialize(() => {
  db.run("DROP TABLE if EXISTS courses");

  //Döper tabellen till "courses"
  db.run(`
        CREATE TABLE courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coursecode TEXT NOT NULL,
            coursename TEXT NOT NULL,
            progression TEXT NOT NULL,
            syllabus TEXT NOT NULL,
            posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
    `);
});

db.close();
