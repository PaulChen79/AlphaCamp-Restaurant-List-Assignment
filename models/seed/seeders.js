const db = require("../../config/mongoose")
const Restaurant = require("../restaurant")
const seed = require("./restaurant.json")

db.once('open', () => {
    seed.results.forEach(restaurant => {
        Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description
        })
    })
    console.log('mongodb connected!')
    process.exit()
})