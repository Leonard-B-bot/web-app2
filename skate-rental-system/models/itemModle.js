const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

// Initialize table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// CRUD Operations
exports.getItems = (callback) => {
  db.all('SELECT * FROM items', [], (err, rows) => callback(err, rows));
};

exports.getItemById = (id, callback) => {
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => callback(err, row));
};

exports.createItem = (item, callback) => {
  const { name, description } = item;
  db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function (err) {
    callback(err, this.lastID);
  });
};

exports.updateItem = (id, item, callback) => {
  const { name, description } = item;
  db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    callback(err);
  });
};

exports.deleteItem = (id, callback) => {
  db.run('DELETE FROM items WHERE id = ?', [id], (err) => callback(err));
};
