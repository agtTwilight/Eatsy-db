const router = require('express').Router();
const {Image} = require('../../models')
const {
        getImage,
        createImage,
        // deleteImage
} = require('../../controllers/imageController');

// /api/items
router.route('/').post(createImage);

router.route('/').get(async (req,res) => {
        const allData = await Image.find()
        res.json(allData)
})

module.exports = router;