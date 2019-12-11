exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accents')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('accents').insert([
        { accentId: 1, accent: 'Southern', languageId: 1 },
        { accentId: 2, accent: 'Mandarin', languageId: 3 },
        { accentId: 3, accent: 'American', languageId: 1 },
        { accentId: 4, accent: 'British', languageId: 1 }
      ]);
    });
};
