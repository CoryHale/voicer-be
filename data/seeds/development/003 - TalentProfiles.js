exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('talentProfiles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('talentProfiles').insert([{ userId: 3 }, { userId: 4 }]);
    });
};
