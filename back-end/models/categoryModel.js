const connection = require('../DB/knexConnection')

class categoryModel {
    static findItemCategory(itemID){
        return connection('categories').select('category').where('itemID', itemID)
    }

    static newEntry(categoryInputs){
        return connection('categories').insert(categoryInputs)
    }

    static async delete(id){
        return connection('categories').where('id', id).del()
    }
}

module.exports = categoryModel