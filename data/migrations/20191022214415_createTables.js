
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('userId');
            tbl.string('username');
            tbl.string('password');
            tbl.string('userType').notNullable();
            tbl.string('email').notNullable().unique();
            tbl.string('firstName').notNullable();
            tbl.string('lastName').notNullable();
        })
        .createTable('talentProfiles', tbl => {
            tbl.increments('talentId');
            tbl.integer('userId').unsigned().references('userId').inTable('users');
            tbl.string('language').notNullable();
        })
        .createTable('clientProfiles', tbl => {
            tbl.increments('clientId');
            tbl.integer('userId').unsigned().references('userId').inTable('users');
            tbl.string('companyName').notNullable();
        })
        .createTable('jobs', tbl => {
            tbl.increments('jobId');
            tbl.integer('clientId').unsigned().references('clientId').inTable('clientProfiles');
            tbl.string('jobTitle').notNullable();
            tbl.string('jobDescription').notNullable();
        })
        .createTable('jobOffers', tbl => {
            tbl.increments('jobOfferId');
            tbl.integer('jobId').unsigned().references('jobId').inTable('jobs');
            tbl.integer('offeredById').unsigned().references('userId').inTable('users');
            tbl.integer('offeredToId').unsigned().references('userId').inTable('users');
            tbl.integer('previousOfferId').unsigned().references('jobOfferId').inTable('jobOffers');
            tbl.string('status').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('jobOffers')
        .dropTableIfExists('jobs')
        .dropTableIfExists('clientProfiles')
        .dropTableIfExists('talentProfiles')
        .dropTableIfExists('users')
};
