const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const Restaurants = require('../../models/restaurant')

// Get create restaurant page
router.get('/new', (req, res) => {
	try {
		res.render('new')
	} catch (error) {
		console.error(error)
	}
})

// Create restaurant
router.post('/new', async (req, res) => {
	try {
		const { name, category, location, phone, description, image, google_map } = req.body
		const userId = req.user._id
		if (!name || !category || !location || !phone || !description) {
			req.flash('error_messages', '必填欄位需要填寫！')
			res.redirect('back')
			return
		}
		if (!validUrl.isUri(image) || !validUrl.isUri(google_map)) {
			req.flash('error_messages', '圖片網址或google map必須是有效網址！')
			res.redirect('back')
			return
		}
		await Restaurants.create({ name, category, location, phone, description, image, google_map, userId })
		req.flash('success_messages', '你已成功新增餐廳！')
		res.redirect('/')
	} catch (error) {
		console.error(error)
	}
})

// View restaurant details
router.get('/:id', async (req, res) => {
	try {
		const userId = req.user._id
		const _id = req.params.id
		const restaurant = await Restaurants.findOne({ _id, userId }).lean()
		if (!restaurant) {
			req.flash('error_messages', '沒有此餐廳！')
			res.redirect('/')
		}
		res.render('show', { restaurant })
	} catch (error) {
		console.error(error)
	}
})

// Get restaurant edit page
router.get('/:id/edit', async (req, res) => {
	try {
		const userId = req.user._id
		const _id = req.params.id
		const restaurant = await Restaurants.findOne({ _id, userId }).lean()
		if (!restaurant) {
			req.flash('error_messages', '沒有此餐廳！')
			res.redirect('/')
		}
		res.render('edit', { restaurant })
	} catch (error) {
		console.error(error)
	}
})

// Update restaurant
router.put('/:id/edit', async (req, res) => {
	try {
		const userId = req.user._id
		const _id = req.params.id
		const { name, category, location, phone, description, image, google_map } = req.body
		if (!name || !category || !location || !phone || !description) {
			req.flash('error_messages', '必填欄位需要填寫！')
			res.redirect('back')
			return
		}
		if (!validUrl.isUri(image) || !validUrl.isUri(google_map)) {
			req.flash('error_messages', '圖片網址或google map必須是有效網址！')
			res.redirect('back')
			return
		}
		const restaurant = await Restaurants.findOne({ _id, userId }).lean()
		restaurant = { name, category, location, phone, description, image, google_map, userId }
		restaurant.save()
		req.flash('success_messages', '你已成功編輯此餐廳！')
		res.redirect(`/restaurants/${id}`)
	} catch (error) {
		console.error(error)
	}
})

// Delete restaurant
router.delete('/:id', async (req, res) => {
	try {
		const userId = req.user._id
		const _id = req.params.id
		const restaurant = await Restaurants.findOne({ _id, userId })
		restaurant.remove()
		req.flash('success_messages', '你已成功刪除此餐廳！')
		res.redirect('/')
	} catch (error) {
		console.error(error)
	}
})

module.exports = router

