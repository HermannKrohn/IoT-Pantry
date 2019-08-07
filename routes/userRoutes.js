const express = require('express')
const router = express.Router()

router
    .get('/login', (req, res) => {
        res.send("Login Page")
    })
    .get('/sign-up', (req, res) => {
        res.send("Sign Up Page")
    })
    .get('/:username/pantry', (req, res) => {
        console.log(req.params)
        res.send("Pantry")
    })

module.exports = router