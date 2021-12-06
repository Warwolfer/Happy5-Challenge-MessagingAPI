exports.up = async function (knex) {
  return knex.schema.createTable('conversations', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('senderId');
    table.uuid('recipientId');
    table.foreign('senderId').references('id').inTable('users').onDelete('SET NULL');
    table.foreign('recipientId').references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('conversations');
};
