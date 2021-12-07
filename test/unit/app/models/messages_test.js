const Users = require('../../../../app/models/users');
const Messages = require('../../../../app/models/messages');
const {Model} = require('objection');
const sinon = require('sinon');
const {expect} = require('@hapi/code');
const Conversations = require('../../../../app/models/conversations');

describe('Message Model', () => {

  it('should have tableName', () => {
    sinon.assert.match(Messages.tableName, 'messages');
  });

  it('should have jsonSchema', () => {
    sinon.assert.match(Messages.jsonSchema, {
      type: 'object',
      properties: {
        id: {type: 'string'},
        conversationId: {type: 'string'},
        senderId: {type: 'string'},
        content: {type: 'string'},
        created_at: {type: 'string'},
        read_at: {type: 'string'},
      }
    });
  });

  it('should have relationMappings', () => {
    expect(Messages.relationMappings.conversation.relation).to.equal(Model.BelongsToOneRelation);
    expect(Messages.relationMappings.conversation.modelClass).to.equal(Conversations);
    expect(Messages.relationMappings.conversation.join).to.equal({
      from: 'messages.conversationId',
      to: 'conversations.id'
    });

    expect(Messages.relationMappings.sender.relation).to.equal(Model.BelongsToOneRelation);
    expect(Messages.relationMappings.sender.modelClass).to.equal(Users);
    expect(Messages.relationMappings.sender.join).to.equal({
      from: 'messages.senderId',
      to: 'users.id'
    });
  });
});
