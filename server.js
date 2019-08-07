const express = require('express')
const userRoutes = require('./routes/userRoutes.js')

const app = express()


app.use('/user', userRoutes)


app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})