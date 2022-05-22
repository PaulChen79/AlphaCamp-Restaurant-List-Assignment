const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const seed = require('./restaurant.json')

db.once('open', async () => {
  await Promise.all(
    Array.from(seed.results, restaurant => {
      return Restaurant.create({
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
  )
  console.log('done!')
  process.exit()
})
