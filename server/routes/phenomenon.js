const express = require('express')
const router = express.Router()
const phenomenonService = require('../services/phenomenonService')


router.post('/fenomeno/cadastro', async (req, res, next) => {
    try {
        const response = await phenomenonService.create(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.post('/fenomeno/consulta', async (req, res, next) => {
    try {
        const response = await phenomenonService.filter(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/fenomeno/consulta/:usuario/:id', async (req, res, next) => {
    try {
        const response = await phenomenonService.filterForUser(req.params.usuario, req.params.id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.put('/fenomeno/atualiza/:id', async(req, res, next) => {
    try {
        const response = await phenomenonService.update(req.params.id, req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.delete('/fenomeno/deleta/:id', async (req, res, next) => {
    try {
        await phenomenonService.remove(req.params.id)
        res.status(201).end()
    } catch (error) {
        next(error)
    }
})


module.exports = router