const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .get('/login', userController.loginPage)
    .get('/sign-up', userController.signUpPage)
    .get('/:username/pantry', userController.userPantry)

module.exports = router