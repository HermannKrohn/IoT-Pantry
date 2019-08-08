const connection = require('../knexConnection')

function getID(firstname){
    return connection.select('id').from('users').where('firstName', firstname)
}

let pantryItemsData = [
    {
        itemName: "Milk",
        userID: getID("Jack")
    },
    {
        itemName: "Eggs",
        userID: getID("Jack")
    },
    {
        itemName: "Nutella",
        userID: getID("Avery")
    },
    {
        itemName: "Bread",
        userID: getID("Juan")
    },
    {
        itemName: "Oreos",
        userID: getID("Juan")
    }
]

module.exports = pantryItemsData