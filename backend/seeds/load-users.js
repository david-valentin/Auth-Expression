
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, username: 'Jack', password:"Test!1234", hall:"Coffrin", room_num:"403", member_since: "2012-05-15"},
          {id: 2, username: 'Mac', password:"Test!1234", hall:"Allen", room_num:"201", member_since: "2012-05-15"},
          {id: 3, username: 'Derek', password:"Test!1234", hall:"Palmer", room_num:"103", member_since: "2012-05-15"}
        ]);
      }),
    knex('types').del()
      .then(function() {
        return knex('types')

      })
  ]


  )
};
