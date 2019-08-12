const connection = require('../knexConnection')

function getID(firstname){
    return connection.select('id').from('users').where('firstName', firstname)
}

let pantryItemsData = [
    {
        itemName: "Milk"
    },
    {
        itemName: "Eggs"
    },
    {
        itemName: "Nutella"
    },
    {
        itemName: "Bread"
    },
    {
        itemName: "Oreos"
    }
]

module.exports = pantryItemsData