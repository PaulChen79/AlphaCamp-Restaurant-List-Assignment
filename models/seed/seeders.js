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
		process.exit()
	} catch (error) {
		console.log(error)
	}
})
