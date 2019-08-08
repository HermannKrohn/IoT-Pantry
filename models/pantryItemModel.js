const connection = require('../DB/knexConnection')

class pantryItemModel {
    static findAllPantryItems(userID){
        return connection.select().from('pantryItems').where('userID', userID)
    }
}

module.exports = pantryItemModel