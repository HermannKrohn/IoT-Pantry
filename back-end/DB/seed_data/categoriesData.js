const connection = require('../knexConnection')

function getID(username){
    return connection.select('id').from('users').where('userName', username)
}

let categoriesData = [
    {
        category: "Dairy",
        userID: getID("jp123")
    },
    {
        category: "Chicken",
        userID: getID("jp123")
    },
    {
        category: "Chocolate",
        userID: getID("ap123")
    },
    {
        category: "Grain",
        userID: getID("ap123")
    },
    {
        category: "Snack",
        userID: getID("ReyRey")
    }
]

module.exports = categoriesData