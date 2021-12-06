exports.up = async function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('conversationId');
    table.uuid('senderId');
    table.text('content').notNullable();
    table.foreign('conversationId').references('id').inTable('conversations').onDelete('CASCADE');
    table.foreign('senderId').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('read_at').defaultTo(null);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('messages');
};
