const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/restaurant")

// Search restaurant
router.get('/', (req, res) => {
  if (!req.query.keyword) res.redirect('/')
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurants.find()
    .lean()
    .then(restaurant => {
      const filteredRestaurant = restaurant.filter(restaurants => 
        restaurants.name.toLowerCase().includes(keyword) || restaurants.category.toLowerCase().includes(keyword)
      )
      return filteredRestaurant
    })
    .then(filteredRestaurant => {
      if (!filteredRestaurant.length) {
        req.flash('error_messages', `沒有符合 ${keyword} 的餐廳或類別`)
        res.redirect('/')
      } else {
        res.render('index', { restaurant: filteredRestaurant, keyword })  
      }
    })
    .catch(error => console.error(error))
})

module.exports = router