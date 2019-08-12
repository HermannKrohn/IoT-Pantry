const express = require('express')
const userRoutes = require('./routes/userRoutes.js')
const hardwareRoutes = require('./routes/hardwareRoutes.js')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))



app.use('/user', userRoutes)
app.use('/hardware', hardwareRoutes)


app.listen(3001, () => {
    console.log("Listening on http://localhost:3001")
})