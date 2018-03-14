// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './backend/dev.sqlite3'
    }
  },
};

// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './backend/dev.sqlite3'
//   },
//   useNullAsDefault: true
// });
