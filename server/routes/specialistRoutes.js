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


module.exports = router