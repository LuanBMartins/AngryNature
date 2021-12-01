const express = require('express')
const specialistService = require('../services/specialistService')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const router = express.Router()


// Create specialist user
router.post('/specialists', async (req, res, next) => {
	const data = req.body
	try {
		const newSpecialist = await specialistService.saveSpecialist(data)
		res.status(201).json(newSpecialist)
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

// Get specialist
router.get('/specialists/:id', ensureAuthenticated, async (req, res, next) => {
	try {
		if (req.usuario.id_user != req.params.id) throw new Error('Unauthorized')
		const specialist = await specialistService.getSpecialist(req.params.id)
		res.status(200).json(specialist)
	} catch (e) {
		next(e)
	}
})


// Update specialist
router.put('/specialists/:id', ensureAuthenticated, async (req, res, next) => {
	const newData = req.body
	try {
		if (req.usuario.id_user != req.params.id) throw new Error('Unauthorized')
		await specialistService.putSpecialist(req.params.id, newData)
		res.status(200).end()
	} catch (e) {
		next(e)
	}
})


module.exports = router