exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments('userId');
      tbl.string('gender');
      tbl
        .string('username')
        .notNullable()
        .unique();
      tbl.string('password').notNullable();
      tbl.string('userType').notNullable();
      tbl
        .string('email')
        .notNullable()
        .unique();
      tbl.string('firstName').notNullable();
      tbl.string('lastName').notNullable();
      tbl.float('averageRating', 2, 1);
      tbl.integer('ratingsReceived').defaultTo(0);
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
      tbl.string('voiceGender');
      tbl.string('voiceAge');
      tbl.string('biography');
      tbl.integer('rating');
    })
    .createTable('talentVoiceSamples', tbl => {
      tbl.increments('sampleId');
      tbl
        .integer('userId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('userId')
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl.string('url');
      tbl.string('description');
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
      tbl.string('price').notNullable();
      tbl.timestamp('createdAt', { useTz: false });
      tbl.string('clientMessage');
    })
    .createTable('reviews', tbl => {
      tbl.increments("reviewId");
      tbl
        .integer('authorId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('authorId')
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl
        .integer('recipientId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('recipientId')
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl
        .integer('jobId')
        .unsigned()
        .notNullable();
      tbl
        .foreign('jobId')
        .references('jobId')
        .inTable('jobs')
        .onDelete('CASCADE');
      tbl.float('rating', 2, 1).notNullable();
      tbl.string('message');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('jobOffers')
    .dropTableIfExists('reviews')
    .dropTableIfExists('jobs')
    .dropTableIfExists('clientProfiles')
    .dropTableIfExists('talentVoiceSamples')
    .dropTableIfExists('talentProfiles')
    .dropTableIfExists('users');
};

// Languages/Accents 