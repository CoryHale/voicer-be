
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('talentProfiles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {userId: 3, language: 'English'},
        {userId: 4, language: 'Japanese'}
      ]);
    });
};
