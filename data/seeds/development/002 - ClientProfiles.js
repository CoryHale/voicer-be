
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clientProfiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('clientProfiles').insert([
        {userId: 1, companyName: 'TestCompanyOne', rating: 3},
        {userId: 2, companyName: 'TestCompanyTwo', rating: 3},
      ]);
    });
};
