const config = require('config')
const express = require('express')
const cors = require('cors')

const PORT = config.get('api.porta')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', require('./routes/userRoutes'))
app.use('/', require('./routes/specialistRoutes'))
app.use('/', require('./routes/phenomenon'))
app.use('/', require('./routes/serviceRoute'))
app.use(require('./middlewares/errors'))

app.listen(PORT, () => {
    console.log(`app listen to localhost ${PORT}`);
})