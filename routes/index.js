const express = require('express')
const restaurants = require('../models/restaurant.json')
const data = restaurants.results
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {restaurant: data})
})

router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = data.find(restaurant => restaurant.id.toString() === id)
  res.render('show', { restaurant })
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = data.filter(restaurants => {
    return restaurants.name.toLowerCase().includes(keyword) || restaurants.category.toLowerCase().includes(keyword)
  })
  if (!restaurants.length) {
    req.flash('error_messages', `沒有符合 ${keyword} 的餐廳或類別`)
    res.redirect('/')
  } else {
    res.render('index', { restaurant: restaurants, keyword })  
  }
})

module.exports = router