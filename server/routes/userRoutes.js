const express = require('express')
const userService = require('../services/userService')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
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

// User login
router.post('/users/login', async (req, res, next) => {
	const data = req.body
	try {
		const token = await userService.loginUser(data)
		res.status(200).json(token)
	} catch (e) {
		next(e)
	}
})

// Get user
router.get('/users/:id', ensureAuthenticated, async (req, res, next) => {
	try {
		if (req.usuario.id_user != req.params.id) throw new Error('Unauthorized')
		const user = await userService.getUser(req.params.id)
		res.status(200).json(user)
	} catch (e) {
		next(e)
	}
})



module.exports = router