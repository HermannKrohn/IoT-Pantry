const connection = require('../knexConnection')

function getID(itemName){
    return connection.select('id').from('pantryItems').where('itemName', itemName)
}

let categoriesData = [
    {
        category: "Dairy",
        itemID: getID("Milk")
    },
    {
        category: "Chicken",
        itemID: getID("Eggs")
    },
    {
        category: "Chocolate",
        itemID: getID("Nutella")
    },
    {
        category: "Grain",
        itemID: getID("Bread")
    },
    {
        category: "Snack",
        itemID: getID("Oreos")
    }
]

module.exports = categoriesData