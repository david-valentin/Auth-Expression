
const typesTable = function(table){
  table.integer('id').primary();
  table.string('name');
  table.string('type');
  table.string('description');
  table.integer('available');
}

const usersTable = function(table){
  table.integer('id').primary();
  table.string('username');
  table.string('password');
  table.string('hall');
  table.string('room_num');
  table.dateTime('member_since');
}

const ordersTable = function(table){
  table.string('username');
  table.string('order_amnt');
  table.string('order_type');
  table.dateTime('order_date');
  table.integer('order_charge');
}


exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('users', usersTable), knex.schema.createTable('orders', ordersTable), knex.schema.createTable('types', typesTable)])
  .then(() => {
    console.log('Database created');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users', usersTable), knex.schema.dropTable('orders', ordersTable), knex.schema.dropTable('types', typesTable)])
  .then(() => {
    console.log('Database Destroyed');
  });
};
