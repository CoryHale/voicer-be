exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('userId');
      tbl.string('gender');
      tbl.string('username').notNullable();
      tbl.string('password').notNullable();
      tbl.string('userType').notNullable();
      tbl
        .string('email')
        .notNullable()
        .unique();
      tbl.string('firstName').notNullable();
      tbl.string('lastName').notNullable();
    })
    .createTable('talentProfiles', tbl => {
      tbl.increments('talentId');
      tbl
        .integer('userId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('userId')
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl.integer('rating');
    })
    .createTable('clientProfiles', tbl => {
      tbl.increments('clientId');
      tbl
        .integer('userId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('userId')
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl.integer('rating');
      tbl.string('companyName').notNullable();
    })
    .createTable('jobs', tbl => {
      tbl.increments('jobId');
      tbl
        .integer('clientId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('clientId')
        .references('clientId')
        .inTable('clientProfiles')
        .onDelete('CASCADE');
      tbl.string('jobTitle').notNullable();
      tbl.string('jobDescription').notNullable();
      tbl.string('createdDate').notNullable();
      tbl.string('initialPrice').notNullable();
      tbl.string('status').notNullable();
    })
    .createTable('jobOffers', tbl => {
      tbl.increments('jobOfferId');
      tbl
        .integer('jobId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('jobId')
        .references('jobId')
        .inTable('jobs')
        .onDelete('CASCADE');
      tbl
        .integer('clientId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('clientId')
        .references('clientId')
        .inTable('clientProfiles')
        .onDelete('CASCADE');
      tbl
        .integer('talentId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('talentId')
        .references('talentId')
        .inTable('talentProfiles')
        .onDelete('CASCADE');
      tbl.boolean('isClientOffer').notNullable();
      tbl.string('status').notNullable();
      tbl.timestamp('createdAt', { useTz: false });
      tbl.string('clientMessage');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('jobOffers')
    .dropTableIfExists('jobs')
    .dropTableIfExists('clientProfiles')
    .dropTableIfExists('talentProfiles')
    .dropTableIfExists('users');
};

// Languages/Accents 