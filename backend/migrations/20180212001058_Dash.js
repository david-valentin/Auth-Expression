const businessesTable = function(table){
  table.integer('id').primary();
  table.string('email');
  table.unique('email');
  table.string('password');
  table.dateTime('member_since');
}


const usersTable = function(table){
  table.integer('id').primary();
  table.string('email');
  table.unique('email');
  table.string('password');
  table.string('hall');
  table.string('room_num');
  table.string('parking_lot');
  table.dateTime('member_since');
}

const ordersTable = function(table){
  table.string('email');
  table.string('items_ordered');
  table.integer('order_cost');
  table.datetime('order_date');
  table.string('order_date_string');
}


exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('users', usersTable), knex.schema.createTable('orders', ordersTable), knex.schema.createTable('businessesTable', businessesTable)])
  .then(() => {
    console.log('Database created');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('users', usersTable), knex.schema.dropTable('orders', ordersTable), knex.schema.dropTable('businessesTable', businessesTable)])
  .then(() => {
    console.log('Database Destroyed');
  });
};
