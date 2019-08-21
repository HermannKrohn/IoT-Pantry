
module.exports =  io => {
    const express = require('express')
    const router = express.Router()
    const hardwareController = require('../controllers/hardwareController.js')(io)

    router
        .post('/new-item', hardwareController.newItem)
        .post('/remove-item', hardwareController.removeItem)
    return router
}