
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clientProfiles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {userId: 1, companyname: 'TestCompanyOne'},
        {userId: 2, companyname: 'TestCompanyTwo'},
      ]);
    });
};
