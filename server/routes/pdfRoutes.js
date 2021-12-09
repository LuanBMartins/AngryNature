const express = require('express')
const router = express.Router()
const pdfService = require('../services/pdfService')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const pdf = require('html-pdf')

router.get('/fenomeno/regiao', ensureAuthenticated, async (req, res, next) => {
    try {
        const response = await pdfService.pdf()

        const options = {
            "format": "A4",
            "orientation": "landscape"
        }
        pdf.create(response, options).toBuffer(function(err, buffer){
            res.status(200).send(buffer)
        });

    } catch (error) {
        console.log(error);
        next(error)
    }
})


module.exports = router