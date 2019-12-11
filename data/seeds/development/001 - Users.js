
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'TestClientOne',
          password: 'testclient1',
          userType: 'client',
          email: 'TestClientOne@test.com',
          firstName: 'Client',
          lastName: 'One',
          gender: 'Male'
        },
        {
          username: 'TestClientTwo',
          password: 'testclient2',
          userType: 'client',
          email: 'TestClientTwo@test.com',
          firstName: 'Client',
          lastName: 'Two',
          gender: 'Female'
        },
        {
          username: 'TestTalentOne',
          password: 'testtalent1',
          userType: 'talent',
          email: 'TestTalentOne@test.com',
          firstName: 'Talent',
          lastName: 'One',
          gender: 'Male'
        },
        {
          username: 'TestTalentTwo',
          password: 'testtalent2',
          userType: 'talent',
          email: 'TestTalentTwo@test.com',
          firstName: 'Talent',
          lastName: 'Two',
          gender: 'Binary'
        }
      ]);
    });
};
