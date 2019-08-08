const userModel = require('../models/userModel')
const validator = require('validator')

class userController {

    static validateRecord = async (record) => {
        let errors = {}
        let user = await userModel.findByUsername(record.userName)
        if (record.firstName.length < 1) {
            errors["firstNameMissing"] = "Missing First Name"
        }
        if (record.lastName.length < 1) {
            errors["lastNameMissing"] = "Missing Last Name"
        }
        if (user.length > 0) {
            errors["userNameTaken"] = "Username already taken"
        }
        if (record.userName.length < 3) {
            errors["userNameLength"] = "Username must be at least 3 characters"
        }
        if (!validator.isEmail(record.email)) {
            errors["emailInvalid"] = "Invalid Email"
        }
        if (record.password_digest.length < 5) {
            errors["passwordLength"] = "Password must be at least 5 characters"
        }
        return errors

    }

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

    static createUser = async (req, res, next) => {
        let inputs = req.body
        let errors = await this.validateRecord(inputs)
        if (Object.keys(errors).length === 0) {
            userModel.createUser(inputs).then(() => {
                res.json({ status: "Successfully created User" })
            }).catch((err) => {
                res.status(500).json({ status: "An Error Occured. Try again" })
                next(err)
            })
        } else {
            res.status(400).json({ status: errors });
        }
    }
}

module.exports = userController