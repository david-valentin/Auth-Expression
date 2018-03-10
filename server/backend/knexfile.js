// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './backend/dev.sqlite3'
    },
    migrations: {
      directory: './backend/migrations'
    }
  }
};
