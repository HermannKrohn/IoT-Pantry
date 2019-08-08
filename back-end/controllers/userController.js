const userModel = require('../models/userModel')

class userController{
    static loginPage = (req, res) => {
        res.send("login page")
    }

    static signUpPage = (req, res) => {
        res.send("sign up page")
    }

    static userPantry = (req, res) => {
        console.log(req.params)
        res.send("Pantry")
    }
}

module.exports = userController