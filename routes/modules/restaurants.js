const express = require("express")
const router = express.Router()
const Restaurants = require("../../models/restaurant")

// Get create restaurant page
router.get('/new', (req, res) => {
  res.render('new')
})

// Create restaurant
router.post('/new', (req, res) => {
  if (!req.body.name || !req.body.category || !req.body.location || !req.body.phone || !req.body.description) {
    req.flash('error_messages','必填欄位需要填寫！')
    req.redirect('back')
  }
  Restaurants.create(req.body)
    .then(() => {
      req.flash('success_messages', '你已成功新增餐廳！')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

// View restaurant details
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)  
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        req.flash('error_messages', '沒有此餐廳！')
        res.redirect('/')
      } else {
        res.render('show', { restaurant })
      }
    })
    .catch(error => console.error(error))
})

// Get restaurant edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurants.findById(id)  
    .lean()
    .then(restaurant => {
      if (!restaurant) {
        req.flash('error_messages', '沒有此餐廳！')
        res.redirect('/')
      } else {
        res.render('edit', { restaurant })
      }
    })
    .catch(error => console.error(error))
})

// Update restaurant
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  if (!req.body.name || !req.body.category || !req.body.location || !req.body.phone || !req.body.description) {
    req.flash('error_messages', '必填欄位需要填寫！')
    req.redirect('back')
  }
  Restaurants.findByIdAndUpdate(id, req.body)
    .then(() => {
      req.flash('success_messages', '你已成功編輯此餐廳！')
      res.redirect(`/restaurants/${id}`)
    })
    .catch(error => console.error(error))
})

// Delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurants.findByIdAndDelete(id)
    .then(() => {
      req.flash('success_messages', '你已成功刪除此餐廳！')
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

module.exports = router