require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const session = require('express-session')
const flash = require('connect-flash')
const mtehodOverride = require('method-override')
const usePassport = require('./config/passport')
const app = express()
require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(mtehodOverride('_method'))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	res.locals.success_messages = req.flash('success_messages')
	res.locals.error_messages = req.flash('error_messages')
	next()
})

app.use(routes)

app.listen(3000, () => {
	console.log('Server is running on port 3000')
})

