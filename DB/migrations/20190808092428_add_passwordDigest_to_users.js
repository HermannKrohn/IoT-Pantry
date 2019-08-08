
exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.string('password_digest').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', table => {
        table.dropColumn('password_digest')
    })
};
