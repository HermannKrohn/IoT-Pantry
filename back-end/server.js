const express = require('express')
const userRoutes = require('./routes/userRoutes.js')
const hardwareRoutes = require('./routes/hardwareRoutes.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const secrets = require('./JWTSecret.js')


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))



app.use('/user', userRoutes)
app.use('/hardware', hardwareRoutes)


app.listen(3001, `${secrets.ipAddress}`,() => {
    console.log(`Listening on http://${secrets.ipAddress}:3001`)
})