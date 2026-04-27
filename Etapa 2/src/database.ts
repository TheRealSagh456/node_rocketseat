import knex from 'knex'
export
const knecs = knex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db',
    }
})