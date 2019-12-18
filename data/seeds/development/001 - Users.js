
const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'TestClientOne',
          password: bcrypt.hashSync('testclient1',10),
          userType: 'client',
          email: 'TestClientOne@test.com',
          firstName: 'Client',
          lastName: 'One',
          gender: 'Male',
          completedJobs: 2,
          loyaltyLevel: 1,
          accountBalance: 5500.50
        },
        {
          username: 'TestClientTwo',
          password: bcrypt.hashSync('testclient2',10),
          userType: 'client',
          email: 'TestClientTwo@test.com',
          firstName: 'Client',
          lastName: 'Two',
          gender: 'Female',
          completedJobs: 1,
          loyaltyLevel: 1,
          accountBalance: 3500.50
        },
        {
          username: 'TestTalentOne',
          password: bcrypt.hashSync('testtalent1',10),
          userType: 'talent',
          email: 'TestTalentOne@test.com',
          firstName: 'Talent',
          lastName: 'One',
          gender: 'Male',
          completedJobs: 2,
          loyaltyLevel: 1,
          accountBalance: 2500.50
        },
        {
          username: 'TestTalentTwo',
          password: bcrypt.hashSync('testtalent2',10),
          userType: 'talent',
          email: 'TestTalentTwo@test.com',
          firstName: 'Talent',
          lastName: 'Two',
          gender: 'Binary',
          completedJobs: 1,
          loyaltyLevel: 1,
          accountBalance: 1500.50
        }
      ]);
    });
};
