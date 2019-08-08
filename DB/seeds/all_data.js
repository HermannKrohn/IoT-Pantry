const usersData = require('../seed_data/usersData')
const pantryItemsData = require('../seed_data/pantryItemsData')
const categoriesData = require('../seed_data/categoriesData')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pantryItems').del().then( () => {
    return knex('users').del()
  })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(usersData).then(() => {
        return knex('pantryItems').insert(pantryItemsData).then(() => {
          return knex('categories').insert(categoriesData)
        })
      })
    })
}
