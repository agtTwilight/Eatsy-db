// what our getSingleUser route will return
const userObj = {
        email: "String",
        username: "String",
        password: "String",
        addresses: ["Array of Strings"],
        company: [companyId],
        following: [compnayId],
        cart: [{
                itemId: "String",
                itemQuantity: "Number"
        }]
}


// What our getSingleCompany route will return
const companyObj = {
        name:"String",
        phoneNumber:"Number",
        email:"String",
        address:"String",
        status: {
                isOpen: "Boolean", 
                lastOpen: "Date"
        },
        termsOfServiceAgreement: "Boolean", 
        depositMethod: "String",
        tags: ["Strings"],
        ratings: ["Numbers"],
        menu: [{
                name: "String",
                price: "Number",
                quantity: "Number",
                previousQuantity: "Number",
                allergens: ["Strings"],
                description: "String",
                img: "String" /*a url or reference to an assest...need to figure that one out with the upload image package*/
        }],
        followers: "Number",
        virtuals: [avgRating, priceComparison, distance]
}
