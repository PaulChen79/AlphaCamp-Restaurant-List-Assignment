const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/restaurant")

// Home page
router.get("/", (req, res) => {
    const sortKey = req.query.sort || 'name'
    Restaurants.find()
        .lean()
        .sort(sortKey)
        .then(restaurant => res.render("index", { restaurant }))
        .catch(error => console.error(error))
})

module.exports = router