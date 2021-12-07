const express = require('express')
const router = express.Router()
const doacaoService = require('../services/doacaoService')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

router.post('/doacao/doar', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await doacaoService.doar(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/doacao/comum/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await doacaoService.comumlistar(id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})


router.get('/doacao/especialista/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await doacaoService.especialistalistar(id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router