// user seeds
const demoU1 = {
        username: "Luke",
        email: "luke@luke.com",
        password: "password",
        address: "1234 N street",
}

const demoU2 = {
        username: "Snickerdoodle",
        email: "cat@cat.com",
        password: "passwordMeow",
        address: "1234 N street",
}

// company seeds
const demoC1 = {
        address: "1234 N street",
        lookingForWork: true,
        description: "We make the finest biscuits.",
        tags: ["Baking", "Gluten Free"],
        username: "Snickerdoodle"
}

const demoC2 = {
        address: "456 S Ave",
        lookingForWork: true,
        description: "Best Breakfast In Town!",
        tags: ["Breakfast", "Light", "Simple"],
        username: "Luke"
}

// item seeds
const demoI1 = {
        address: "1234 N street",
        name: "Biscuit",
        description: "Fluffy handmade biscuits. Kneaded each night with tender paws.",
        img: "https://i.etsystatic.com/36487870/r/il/0eac67/4189667497/il_fullxfull.4189667497_ajwz.jpg"
}

const demoI2 = {
        address: "456 S Ave",
        name: "Omlette",
        description: "3 egg omlette with mushrooms, green onions, furikake, fat free mozzeralla, and kewpie."
}

const demoI3 = {
        address: "456 S Ave",
        name: "Avocado Toast",
        description: "Avocado toast topped with nutritional yeast, salt, pepper, cayenne, and one over medium egg."
}

module.exports = {demoU1, demoU2, demoC1, demoC2, demoI1, demoI2, demoI3}
