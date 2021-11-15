const config = require('config')
const express = require('express')
const cors = require('cors')

const PORT = config.get('api.porta')
const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`app listen to localhost ${PORT}`);
})