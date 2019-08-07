module.exports = { 
    development: {
        client: 'mysql',
        version: '8.0.16',
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '123',
          database: 'mod5'
        },
        migrations: {
          directory: './DB/migrations',
          tableName: 'knex_migrations'
        },
        seeds: {
          directory: './DB/seeds'
        }
      },
      production: {}
    }
    