const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

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

router.post('/register', async (req, res) => {
	try {
		const { name, email, password, confirmPassword } = req.body
		const user = await User.findOne({ email })
		if (user)
			return res.render('register', {
				name,
				email,
				password,
				confirmPassword,
				error_messages: 'User already exists.'
			})
		await User.create({
			name,
			email,
			password
		})
		return res.redirect('/')
	} catch (error) {
		console.log(err)
	}
})

router.get('/logout', (req, res) => {
	req.logout(error => {
		if (error) return console.log(error)
		res.redirect('/users/login')
	})
})

module.exports = router
