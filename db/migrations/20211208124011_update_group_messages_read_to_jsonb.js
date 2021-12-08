exports.up = async function (knex) {
  return knex.schema.table('groupMessages', (table) => {
    table.jsonb('read').defaultTo(null).alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table('groupMessages', (table) => {
    table.json('read').defaultTo(null).alter();
  });
};
