const path = require('path')

let sqlitepath = path.join(process.cwd(), '/app/database/', 'database.db')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: sqlitepath
  },
  useNullAsDefault: true
})

module.exports = knex
