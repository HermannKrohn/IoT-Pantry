const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .get('/login', userController.loginPage)
    .get('/sign-up', (req, res) => {
        res.send("Sign Up Page")
    })
    .get('/:username/pantry', (req, res) => {
        console.log(req.params)
        res.send("Pantry")
    })

module.exports = router