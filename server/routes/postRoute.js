const express = require('express')
const router = express.Router()
const postService = require('../services/postService')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

router.post('/post/cadastro', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await postService.create(req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/post/lista', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await postService.read()
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.get('/post/consulta/usuario/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const id = req.params.id
        const response = await postService.readOne(id)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.put('/post/atualiza/:id', ensureAuthenticated, async(req, res, next) => {
    try {
        const id = req.params.id
        const response = await postService.update(id, req.body)
        res.status(200).send(response)
    } catch (error) {
        next(error)
    }
})

router.delete('/post/deleta/:id', ensureAuthenticated, async (req, res, next) => {
    try {
        const id = req.params.id
        await postService.delete(id)
        res.status(201).end()
    } catch (error) {
        next(error)
    }
})


module.exports = router