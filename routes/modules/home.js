const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

// Home page
router.get('/', async (req, res) => {
  try {
    const sortKey = req.query.sort || 'name'
    const restaurant = await Restaurants.find().lean().sort(sortKey)
    res.render('index', { restaurant })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
