const express = require('express')
const userService = require('../services/userService')


const router = express.Router()
// Create user
router.post('/users', async (req, res, next) => {
	const data = req.body
	try {
		const newUser = await userService.saveUser(data)
		res.status(201).json(newUser)
	} catch (e) {
		next(e)
	}
})


module.exports = router