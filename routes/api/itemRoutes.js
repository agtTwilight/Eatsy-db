const router = require('express').Router();
const {
        createItem,
        deleteItem,
        updateItem
} = require('../../controllers/itemController');

// /api/items
router.route('/').post(createItem).put(updateItem).delete(deleteItem);

module.exports = router;