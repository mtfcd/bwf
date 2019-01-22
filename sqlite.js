const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('bwf');

// db.run("CREATE TABLE player (info TEXT)");