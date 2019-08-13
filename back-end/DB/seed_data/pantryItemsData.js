const connection = require('../knexConnection')

function getID(firstname){
    return connection.select('id').from('users').where('firstName', firstname)
}

let pantryItemsData = [
    {
        itemName: "Milk",
        UID: "1A 1A 1A 1A"
    },
    {
        itemName: "Eggs",
        UID: "1A 1A 1A 1A"
    },
    {
        itemName: "Nutella",
        UID: "1A 1A 1A 1A"
    },
    {
        itemName: "Bread",
        UID: "1A 1A 1A 1A"
    },
    {
        itemName: "Oreos",
        UID: "1A 1A 1A 1A"
    }
]

module.exports = pantryItemsData