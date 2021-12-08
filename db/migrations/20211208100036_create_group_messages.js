exports.up = async function (knex) {
  return knex.schema.createTable('groupMessages', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('groupConversationId');
    table.uuid('senderId');
    table.text('content').notNullable();
    table.foreign('groupConversationId').references('id').inTable('groupConversations').onDelete('CASCADE');
    table.foreign('senderId').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.json('read').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('groupMessages');
};
