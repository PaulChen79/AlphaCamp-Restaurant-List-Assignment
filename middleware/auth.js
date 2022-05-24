module.exports = {
	authenticator: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		req.flash('error_messages', 'You have to login.')
		res.redirect('/users/login')
	}
}
