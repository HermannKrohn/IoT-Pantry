const express = require('express')
const userRoutes = require('./routes/userRoutes.js')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



app.use('/user', userRoutes)


app.listen(3001, () => {
    console.log("Listening on http://localhost:3001")
})