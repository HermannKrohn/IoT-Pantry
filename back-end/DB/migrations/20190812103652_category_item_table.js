
exports.up = function(knex) {
    return knex.schema
        .createTable('category_items', table => {
            table.increments('id')
            table.integer('categoryID').unsigned().notNullable()
            table.foreign('categoryID').references('id').inTable('categories').onDelete('CASCADE')
            table.integer('itemID').unsigned().notNullable()
            table.foreign('itemID').references('id').inTable('pantryItems').onDelete('CASCADE')
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6))
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))
        })
};

exports.down = function(knex) {
    return knex.schema.dropTable('category_items')
};
