
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('talentProfiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('talentProfiles').insert([
        {userId: 3, rating: 3},
        {userId: 4, rating: 3},
        {userId: 5, rating: 3}
      ]);
    });
};
