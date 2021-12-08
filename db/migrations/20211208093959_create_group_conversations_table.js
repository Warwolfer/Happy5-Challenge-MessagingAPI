exports.up = async function (knex) {
  return knex.schema.createTable('groupConversations', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('creatorId');
    table.foreign('creatorId').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('groupConversations');
};
