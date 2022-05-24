const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

// Home page
router.get('/', async (req, res) => {
	try {
		const userId = req.user._id
		const sortKey = req.query.sort || 'name'
		const restaurant = await Restaurants.find({ userId }).lean().sort(sortKey)
		res.render('index', { restaurant })
	} catch (error) {
		console.error(error)
	}
})

module.exports = router

