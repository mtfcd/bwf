const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('bwf');


async function insertMany(players) {
  const stmt = db.prepare("INSERT INTO player (name, nation, link, wins, loses, id) VALUES (?, ?, ?, ?, ?, ?)");
  
  return new Promise((resolve, reject) => {

    players.forEach(player => {
      stmt.run([player.name, player.nation, player.link, player.wins, player.loses, player.id], err => {
        if (err !== null) {
          // console.log(err);
          // reject(err);
        }
      })
    });

    stmt.finalize();
    resolve(true);    
  })
}

module.exports = {
  insertMany
}
