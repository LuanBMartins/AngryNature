const express = require('express')
const router = express.Router()
const axios = require('axios').default

router.get('/servico/cidades/:estado', async (req, res) => {
    try {
        
        const estado = req.params.estado.toLowerCase()
        const response = await axios.get(`http://educacao.dadosabertosbr.com/api/cidades/${estado}`)
        const data = response.data
        const cidades = data.map(item => {
            const city = item.split(':')
            return city[1]
        })

        res.send(cidades)
    } catch (error) {
        res.status(500).end()
    }
})

module.exports = router