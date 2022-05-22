const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

// Search restaurant
router.get('/', async (req, res) => {
  try {
    if (!req.query.keyword) res.redirect('/')
    const keyword = new RegExp(req.query.keyword.trim(), 'i')
    const sortKey = req.query.sort || 'name'
    const filteredRestaurant = await Restaurants.find({
      $or: [{ name: { $regex: keyword } }, { category: { $regex: keyword } }]
    })
      .lean()
      .sort(sortKey)
    if (!filteredRestaurant.length) {
      req.flash('error_messages', `沒有符合 ${req.query.keyword} 的餐廳或類別`)
      res.redirect('back')
    } else {
      res.render('index', { restaurant: filteredRestaurant, keyword: req.query.keyword })
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
