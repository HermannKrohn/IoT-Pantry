const connection = require('../knexConnection')

function getCategoryID(category){
    return connection.select('id').from('categories').where('category', category)
}

function getItemID(item){
    return connection.select('id').from('pantryItems').where('itemName', item)
}

let categoryItemsData = [
    {
        categoryID: getCategoryID("Dairy"),
        itemID: getItemID("Milk")
    },
    {
        categoryID: getCategoryID("Chicken"),
        itemID: getItemID("Eggs")
    },
    {
        categoryID: getCategoryID("Chocolate"),
        itemID: getItemID("Nutella")
    },
    {
        categoryID: getCategoryID("Grain"),
        itemID: getItemID("Bread")
    },
    {
        categoryID: getCategoryID("Snack"),
        itemID: getItemID("Oreos")
    }
]

module.exports = categoryItemsData