
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'TestClientOne',
          password: 'testclient1',
          userType: 'client',
          email: 'TestClientOne@test.com',
          firstName: 'Client',
          lastName: 'One'
        },
        {
          username: 'TestClientTwo',
          password: 'testclient2',
          userType: 'client',
          email: 'TestClientTwo@test.com',
          firstName: 'Client',
          lastName: 'Two'
        },
        {
          username: 'TestTalentOne',
          password: 'testtalent1',
          userType: 'talent',
          email: 'TestTalentOne@test.com',
          firstName: 'Talent',
          lastName: 'One'
        },
        {
          username: 'TestTalentTwo',
          password: 'testtalent2',
          userType: 'talent',
          email: 'TestTalentTwo@test.com',
          firstName: 'Talent',
          lastName: 'Two'
        }
      ]);
    });
};
