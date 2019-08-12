const connection = require('../DB/knexConnection')
const JWTSecret = require('../JWTSecret')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

class userModel {

    static findByUsername(username){
        return connection('users').select().where('userName', username);
    }

    static findByID(id){
        return connection('users').select().where('id', id)
    }

    static createUser(userInputs){
        return connection('users').insert(userInputs)
    }

    static async hashPassword(plainTextPassword){
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(plainTextPassword, salt)
    }

    static generateJWT(id){
        return jwt.encode({id: id}, JWTSecret)
    }

    static async authenticatePassword(password, hash){
        return await bcrypt.compare(password, hash)
    }

    static async checkCrendentials(password, userArr){// send password and password digest and find user in the controller instead
        if(userArr.length > 0 && await this.authenticatePassword(password, userArr[0].password_digest)){
            return true
        }
        return false
    }
}

module.exports = userModel
