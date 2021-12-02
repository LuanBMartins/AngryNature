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

// Get all especialists
router.get('/specialists', async (req, res, next) => {
	try {
		const specialists = await specialistService.getSpecialists()
		res.status(200).json(specialists)
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
  console.log(newData)
	try {
		if (req.usuario.id_user != req.params.id) throw new Error('Unauthorized')
		await specialistService.putSpecialist(req.params.id, newData)
		res.status(200).end()
	} catch (e) {
		next(e)
	}
})


// Delete specialist
router.delete('/specialists/:id', ensureAuthenticated, async (req, res, next) => {
	try {
		if (req.usuario.id_user != req.params.id) throw new Error('Unauthorized')
		await specialistService.deleteSpecialist(req.params.id)
		res.status(200).end()
	} catch (e) {
		next(e)
	}
})

module.exports = router