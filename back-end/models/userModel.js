const connection = require('../DB/knexConnection')

class userModel {

    static findByUsername(username){
        return connection('users').select().where('userName', username);
    }

    static createUser(userInputs){
        return connection('users').insert(userInputs)
    }
}

module.exports = userModel