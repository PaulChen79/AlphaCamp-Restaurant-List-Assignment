const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restSeeds = require('./restaurant.json')
const User = require('../user')
const bcrypt = require('bcryptjs')

const seedUsers = [
	{
		name: 'user1',
		email: 'user1@example.com',
		password: '12345678',
		restOfUser: [1, 2, 3]
	},
	{
		name: 'user2',
		email: 'user2@example.com',
		password: '12345678',
		restOfUser: [4, 5, 6]
	}
]

db.once('open', async () => {
	try {
		await Promise.all(
			Array.from(seedUsers, async seedUser => {
				const user = await User.findOne({ email: seedUser.email })
				if (user) return user
				const salt = await bcrypt.genSalt(10)
				const hash = await bcrypt.hash(seedUser.password, salt)
				const newUser = await User.create({
					name: seedUser.name,
					email: seedUser.email,
					password: hash
				})
				const userId = newUser._id
				await Promise.all(
					Array.from(restSeeds.results, restSeed => {
						if (seedUser.restOfUser.includes(restSeed.id)) {
							restSeed.userId = userId
							return Restaurant.create(restSeed)
						}
					})
				)
			})
		)
		console.log('done.')
	} catch (error) {
		console.log(error)
	}
})

// db.once('open', () => {
//   return Promise.all(Array.from(seedUser, (seedUser) => {
//     User.findOne({ email: seedUser.email })
//       .then((user) => {
//         if (user) return user

//         return bcrypt
//           .genSalt(10)
//           .then(salt => bcrypt.hash(seedUser.password, salt))
//           .then(hash => User.create({
//             name: seedUser.name,
//             email: seedUser.email,
//             password: hash
//           }))
//       })
//       .then(user => {
//         const userId = user._id
//         return Promise.all(Array.from(restaurantList.results, (item, index) => {
//           if (seedUser.have.includes(index)) {
//             const addItem = item
//             addItem.userId = userId
//             Restaurants.create(addItem)
//           }
//         }))
//       })
//   }))
// })
//   .then(() => {
//     console.log('種子資料 載入結束')
//     // process.exit() 啟動之後就無法載入種子資料了，搞不太懂Promise的原理。
//   })
//   .catch(err => console.log(err))

