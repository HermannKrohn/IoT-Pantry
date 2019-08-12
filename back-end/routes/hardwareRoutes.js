const express = require('express')
const router = express.Router()
const hardwareController = require('../controllers/hardwareController.js')

router
    .post('/new-item', hardwareController.newItem)

module.exports = router