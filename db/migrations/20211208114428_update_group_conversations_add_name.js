exports.up = async function (knex) {
  return knex.schema.table('groupConversations', (table) => {
    table.string('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('groupConversations', (table) => {
    table.dropColumn('name');
  });
};
