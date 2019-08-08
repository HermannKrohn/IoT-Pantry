const userModel = require('../models/userModel')

class userController{
    static loginPage = (req, res) => {
        res.send("login page")
    }
}

module.exports = userController