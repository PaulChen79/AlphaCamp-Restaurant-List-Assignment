const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/restaurant")

// Home page
router.get("/", (req, res) => {
    Restaurants.find()
        .lean()
        .then(restaurant => res.render("index", { restaurant }))
        .catch(error => console.error(error))
})

module.exports = router