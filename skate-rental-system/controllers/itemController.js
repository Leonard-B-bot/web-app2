const Item = require('../models/itemModel');

exports.getAllItems = (req, res) => {
  Item.getItems((err, items) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.render('index', { items });
  });
};

exports.createNewItem = (req, res) => {
  const { name, description } = req.body;
  Item.createItem({ name, description }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to add item' });
    }
    res.redirect('/');
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Item.updateItem(id, { name, description }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update item' });
    }
    res.redirect('/');
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.deleteItem(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete item' });
    }
    res.redirect('/');
  });
};
