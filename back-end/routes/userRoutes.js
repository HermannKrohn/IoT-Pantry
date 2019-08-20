const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router
    .get('/login', userController.loginPage)
    .get('/sign-up', userController.signUpPage)
    .get('/get-username', userController.getUsername)
    .post('/:username/pantry', userController.userPantry)
    .post('/new-user', userController.createUser)
    .post('/login', userController.authenticate)

module.exports = router