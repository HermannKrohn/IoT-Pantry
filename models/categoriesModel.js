const connection = require('../DB/knexConnection')

class categoriesModel {
    static findItemCategory(itemID){
        return connection.select('category').from('categories').where('itemID', itemID)
    }
}

module.exports = categoriesModel