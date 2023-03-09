const { Image, Item, User } = require('../models');
const multer = require("multer");
const fs = require('fs')

const Storage = multer.diskStorage({
        destination: "uploads",
        filename: (req, file, cb) => {
                cb(null, file.originalname);
        }
});

const upload = multer({
        storage: Storage
}).single('testImage')

module.exports = {
        createImage(req, res) {
                upload(req, res, (err) => {
                        if (err) {
                                console.log(err)
                        } else {
                                const newImage = new Image({
                                        name: req.body.name,
                                        image: {
                                                data: fs.readFileSync('uploads/' + req.file.filename),
                                                contentType: 'image/png'
                                        }
                                })
                                newImage.save()
                                        .then((img) => {
                                                return Item.findOneAndUpdate(
                                                        { _id: req.body.itemId },
                                                        { $addToSet: { img: img._id.toString() } },
                                                        { new: true }
                                                )
                                        }).then(res.json({ "msg": "successfully uploaded" }))
                                        .catch(err => console.log(err))
                        }
                })
        },

        getImage(req, res) {
                Image.find()
                        .then(imgData => res.json(imgData))
                        .catch(err => res.status(500).json(err))
        }
}
