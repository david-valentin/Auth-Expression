
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
        return knex('types').insert([
          {id: 1, name: 'Girl Scout Cookies', type:"Hybrid", description:
          "Girl Scout Cookies, or GSC, is an OG Kush and Durban Poison hybrid cross whose reputation grew too large to stay within the borders of its California homeland. With a sweet and earthy aroma, Girl Scout Cookies launches you to euphoria’s top floor where full-body relaxation meets a time-bending cerebral space. A little goes a long way with this hybrid, whose THC heights have won Girl Scout Cookies numerous Cannabis Cup awards. Patients needing a strong dose of relief, however, may look to GSC for severe pain, nausea, and appetite loss."},
          {id: 2, name: 'Blue Dream', type:"Hybrid", description:
          "Blue Dream, a sativa-dominant hybrid originating in California, has achieved legendary status among West Coast strains. Crossing a Blueberry indica with the sativa Haze, Blue Dream balances full-body relaxation with gentle cerebral invigoration. Novice and veteran consumers alike enjoy the level effects of Blue Dream, which ease you gently into a calm euphoria. Some Blue Dream phenotypes express a more indica-like look and feel, but the sativa-leaning variety remains most prevalent."
          }
        ])

      })
  ]


  )
};
