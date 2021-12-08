exports.up = async function (knex) {
  return knex.schema.createTable('groupConversationParticipants', (table) => {
    table.uuid('groupConversationId');
    table.uuid('userId');
    table.foreign('groupConversationId').references('id').inTable('groupConversations').onDelete('CASCADE');
    table.foreign('userId').references('id').inTable('users').onDelete('SET NULL');
    table.primary(['groupConversationId', 'userId']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('groupConversationParticipants');
};
