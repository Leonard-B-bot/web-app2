const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const itemRoutes = require('./routes/itemRoutes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use the item routes
app.use(itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
