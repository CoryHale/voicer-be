exports.up = function(knex) {
  return knex.schema
    .createTable('languages', tbl => {
      tbl.increments('languageId');
      tbl.string('language').notNullable();
    })

    .createTable('accents', tbl => {
      tbl.increments('accentId');
      tbl.string('accent').notNullable();
      tbl
        .integer('languageId')
        .unsigned()
        .notNullable()
        .references('languageId')
        .inTable('languages')
        .onDelete('CASCADE');
    })

    .createTable('talentLanguages', tbl => {
      tbl.increments('talentLanguageId');
      tbl
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl
        .integer('languageId')
        .unsigned()
        .notNullable()
        .references('languageId')
        .inTable('languages')
        .onDelete('CASCADE');
    })
    .createTable('talentAccents', tbl => {
      tbl.increments('talentAccentId');
      tbl
        .integer('userId')
        .unsigned()
        .notNullable()
        .references('userId')
        .inTable('users')
        .onDelete('CASCADE');
      tbl
        .integer('accentId')
        .unsigned()
        .notNullable()
        .references('accentId')
        .inTable('accents')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('talentAccents')
    .dropTableIfExists('talentLanguages')
    .dropTableIfExists('accents')
    .dropTableIfExists('languages');
};
