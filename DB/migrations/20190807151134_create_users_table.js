
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id')
            table.string('firstName').notNullable()
            table.string('lastName').notNullable()
            table.string('userName').notNullable()
            table.string('email').notNullable()
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')
}
