const connection = require('../DB/knexConnection')

class userModel {
    static findByID(id){
        return connection.select().from('users').where('id', id)
    }

    static findByUsername(username){
        return connection.select().from('users').where('userName', username)
    }
}

module.exports = userModel