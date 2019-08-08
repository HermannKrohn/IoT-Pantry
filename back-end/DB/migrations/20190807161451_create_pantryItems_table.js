
exports.up = function(knex) {
    return knex.schema
        .createTable('pantryItems', table => {
            table.increments('id')
            table.string('itemName').notNullable()
            table.integer('userID').unsigned().notNullable()
            table.foreign('userID').references('id').inTable('users').onDelete('CASCADE')
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('pantryItems')
}
