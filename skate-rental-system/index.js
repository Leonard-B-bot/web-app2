const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();  // Add SQLite import

const app = express();
const port = process.env.PORT || 3000;

const itemRoutes = require('./routes/itemRoutes');

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Database path (ensure this points to the correct location)
const dbPath = path.resolve(__dirname, 'database', 'new_database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database: ", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Use the item routes
app.use(itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
