const connection = require("../config/connection");
const {User, Company, Item} = require("../models");
const {demoU1, demoU2, demoC1, demoC2, demoI1, demoI2, demoI3} = require("./seedData")

connection.once("open", async () => {
        console.log("connected...");

        // reset database
        await User.deleteMany({});
        await Company.deleteMany({});
        await Item.deleteMany({});
        console.log("database reset...")

        // Create demo seed collections
        const users = [demoU1, demoU2]
        const companies = [demoC1, demoC2]
        const items = [demoI1, demoI2, demoI3]

        // Add the users to the db
        for (i=0; i < users.length; i++){
                await User.create(users[i])
        }

        // Add companies to the db
        for (i=0; i < companies.length; i ++){
                await Company.create(companies[i])
                .then((dbCompanyData) => {
                        return User.findOneAndUpdate(
                                {username: companies[i].username},
                                {$addToSet: {company: dbCompanyData._id.toString()}}
                        )
                })
        }

        // Add items to the db
        for (i=0; i < items.length; i ++){
                await Item.create(items[i])
                .then((dbItemData) => {
                        User.findOne({username: items[i].username})
                        .then((dbUserData) => {
                                return Company.findOneAndUpdate(
                                        {_id: dbUserData.company},
                                        {$addToSet: {menu: dbItemData._id.toString()}}
                                        )
                        })
                })
        }

        console.log("database seeded!")
})
