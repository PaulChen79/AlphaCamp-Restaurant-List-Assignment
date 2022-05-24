const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
	res.render('login')
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login'
	})
)

router.get('/logout', (req, res) => {
	req.logout(error => {
		if (error) return console.log(error)
		res.redirect('/users/login')
	})
})

module.exports = router
