const connection = require('../DB/knexConnection')

class categoryItemModel{
    static newEntry(categoryItemInputs){
        return connection('category_items').insert(categoryItemInputs)
    }
}

module.exports = categoryItemModel