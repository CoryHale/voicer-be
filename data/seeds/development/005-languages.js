exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('languages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('languages').insert([
        { languageId: 1, language: 'English' },
        { languageId: 2, language: 'Spanish' },
        { languageId: 3, language: 'Chinese' },
        { languageId: 4, language: 'Russian' }
      ]);
    });
};
