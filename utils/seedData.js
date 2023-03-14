// user seeds
const demoU1 = {
        username: "Lukas",
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
        lookingForWork: true,
        description: "We make the finest biscuits.",
        tags: ["Baking", "Gluten Free"],
        username: "Snickerdoodle"
}

const demoC2 = {
        lookingForWork: true,
        description: "Best Breakfast In Town!",
        tags: ["Breakfast", "Light", "Simple"],
        username: "Lukas"
}

// item seeds
const demoI1 = {
        username: "Snickerdoodle",
        name: "Biscuit",
        description: "Fluffy handmade biscuits. Kneaded each night with tender paws.",
}

const demoI2 = {
        username: "Lukas",
        name: "Omlette",
        description: "3 egg omlette with mushrooms, green onions, furikake, fat free mozzeralla, and kewpie."
}

const demoI3 = {
        username: "Lukas",
        name: "Avocado Toast",
        description: "Avocado toast topped with nutritional yeast, salt, pepper, cayenne, and one over medium egg."
}

module.exports = {demoU1, demoU2, demoC1, demoC2, demoI1, demoI2, demoI3}
