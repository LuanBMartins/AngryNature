const express = require('express')
const specialistService = require('../services/specialistService')


const router = express.Router()


// Create specialist user
router.post('/specialists', async (req, res, next) => {
	const data = req.body
	try {
		const newUser = await specialistService.saveSpecialist(data)
		res.status(201).json(newUser)
	} catch (e) {
		next(e)
	}
})


// Specialist login
router.post('/specialists/login', async (req, res, next) => {
	const data = req.body
	try {
		const token = await specialistService.loginSpecialist(data)
		res.status(200).json(token)
	} catch (e) {
		next(e)
	}
})



module.exports = router