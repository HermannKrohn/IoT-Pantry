
exports.up = function(knex) {
  return knex.schema.table('pantryItems', table => {
      table.string('UID').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('pantryItems', table => {
      table.dropColumn('UID')
  })
};
