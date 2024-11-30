const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Display all items
router.get('/', itemController.getAllItems);

// Create new item
router.post('/items', itemController.createNewItem);

// Update item
router.post('/items/:id/edit', itemController.updateItem);

// Delete item
router.post('/items/:id/delete', itemController.deleteItem);

module.exports = router;
