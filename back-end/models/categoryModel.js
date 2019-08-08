const connection = require('../DB/knexConnection')

class categoryModel {
    static findItemCategory(itemID){
        return connection.select('category').from('categories').where('itemID', itemID)
    }
}

module.exports = categoriesModel