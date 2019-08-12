const connection = require('../DB/knexConnection')

class pantryItemModel {
    static findAllPantryItems(userID){
        return connection.select().from('pantryItems').where('userID', userID)
    }

    static newEntry(itemInputs){
        return connection('pantryItems').insert(itemInputs)
    }
}

module.exports = pantryItemModel