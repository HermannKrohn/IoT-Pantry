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

    static async removeEntry(userID, UID){
        return connection.from('users')
                .select('categories.*', 'pantryItems.*', 'category_items.categoryID as catID').where({userID: userID, UID: UID})
                .leftOuterJoin('categories', 'users.id', 'categories.userID')
                .leftOuterJoin('category_items', 'categories.id', 'category_items.categoryID')
                .leftOuterJoin('pantryItems', 'category_items.itemID', 'pantryItems.id')    
    }

    static async combineTables(userID){
        return connection.from('users')
                .select('categories.*', 'pantryItems.*', 'category_items.categoryID as catID').where({userID: userID})
                .leftOuterJoin('categories', 'users.id', 'categories.userID')
                .leftOuterJoin('category_items', 'categories.id', 'category_items.categoryID')
                .leftOuterJoin('pantryItems', 'category_items.itemID', 'pantryItems.id') 
    }

    static async delete(id){
        return connection('pantryItems').where('id', id).del()
    }
}

module.exports = pantryItemModel