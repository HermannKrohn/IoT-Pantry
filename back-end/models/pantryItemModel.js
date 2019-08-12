const connection = require('../DB/knexConnection')

class pantryItemModel {
    static findAllPantryItems(userID){
        return connection('pantryItems').select().where('userID', userID)
    }

    static async findByUID(UID){
        let itemArr = await connection('pantryItems').select().where('UID', UID)
        if(itemArr.length > 0){
            return true
        }
        return false
    }

    static async newEntry(itemInputs){
        return connection('pantryItems').insert(itemInputs)
    }
}

module.exports = pantryItemModel