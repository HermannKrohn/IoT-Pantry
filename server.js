const express = require('express')

const app = express();

app.use('/user', './routes/userRoutes.js')

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000")
})