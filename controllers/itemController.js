const { Company, Item } = require('../models')

module.exports = {
        // create item
        createItem(req, res) {
                Item.create(req.body)
                        .then((item) => {
                                res.json(item)
                                // TODO make it so user data w/ company id is saved to local storage 
                                return Company.findOneAndUpdate(
                                        { _id: req.body.companyId },
                                        { $addToSet: { menu: item._id.toString() } }
                                )
                        })
                .catch((err) => res.status(500).json(err));
        },

        // delete item
        deleteItem(req, res) {
                Item.findOneAndDelete({ _id: req.body.itemId})
                .then((user) => res.json(user))
                .catch((err) => res.status(500).json(err));
        },

        // update item
        updateItem(req, res) {
                Item.findOneAndUpdate(
                        { _id: req.body.itemId },
                        req.body,
                        { new: true }
                )
                .then((item) => res.json(item))
                .catch((err) => res.status(500).json(err));

        }
}
