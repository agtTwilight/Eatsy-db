const userObj = {
        email: "",
        username: "",
        password: "",
        addresses: ["standard address fields"],
        paymentMethods: ["cardNum","expirationDate","cardName","CVC"],
        company: companyId
}

const companyObj = {
        name:"",
        number:"",
        email:"",
        address:"",

        // When user puts store online, Then isOpen updates to true, and lastOpen updates to current date/time. When your session cookie expires, isOpen is updated to false and lastOpen updates to current data/time.
        status: {isOpen:Boolean, lastOpen: date&time},

        // To avoide having to check if they are verified to sell food via our service, we can just make sure they have read and agree to a waiver that makes us not liable for anything they sell on the app.
        termsOfServiceAgreement: Boolean, required:true,

        // Store owner can decide to select up to three tags that represent the type of cuisine they sell.
        cuisineTags: [""], maxLength:3,

        items: [{item}],

        virtuals: [rating, priceComparison, distance]
}

const itemObj = {
        name:"",
        description:"", maxLength:250,
        price: "regex verification (ex: 19.00)",
        quantity: "minlength:0", default:0||"whatever you had left over from the previous day is shown as a suggestion",
        previousQuantity:"",
        allergens:"",
        img:"",
}