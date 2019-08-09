const userModel = require('../models/userModel')
const validator = require('validator')
const jwt = require('jwt-simple')

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
        if (record.password.length < 5) {
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
            let hashedPassword = await userModel.hashPassword(inputs.password)
            let newUser = {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                userName: inputs.userName,
                email: inputs.email,
                password_digest: hashedPassword
            }
            userModel.createUser(newUser).then((IDArray) => {
                let token = userModel.generateJWT(IDArray[0])
                res.json({ status: "Success", token: token})
            }).catch((err) => {
                res.status(500).json({ status: "Error" })
                next(err)
            })
        } else {
            res.status(400).json({ status: "Error", errors: errors });
        }
    }

    static authenticate = async (req, res, next) => {
        let {username, password} = req.body
        let userArr = await userModel.findByUsername(username)
        if(await userModel.checkCrendentials(password, userArr)){
            let token = userModel.generateJWT(userArr[0].id)
            res.json({ status: "Success", token: token})
        }else{
            res.status(400).json({ status: "Error", errors: {"unableToAuthenticate": "Username or password incorrect. Try again."} });
        }
    }
}

module.exports = userController