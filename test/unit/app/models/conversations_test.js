const Users = require('../../../../app/models/users');
const {Model} = require('objection');
const sinon = require('sinon');
const {expect} = require('@hapi/code');
const Conversations = require('../../../../app/models/conversations');
const Messages = require('../../../../app/models/messages');

describe('Conversation Model', () => {

  it('should have tableName', () => {
    sinon.assert.match(Conversations.tableName, 'conversations');
  });

  it('should have jsonSchema', () => {
    sinon.assert.match(Conversations.jsonSchema, {
      type: 'object',
      properties: {
        id: {type: 'string'},
        senderId: {type: 'string'},
        recipientId: {type: 'string'},
        created_at: {type: 'string'}
      }
    });
  });

  it('should have relationMappings', () => {
    expect(Conversations.relationMappings.messages.relation).to.equal(Model.HasManyRelation);
    expect(Conversations.relationMappings.messages.modelClass).to.equal(Messages);
    expect(Conversations.relationMappings.messages.join).to.equal({
      from: 'conversations.id',
      to: 'messages.conversationId'
    });

    expect(Conversations.relationMappings.sender.relation).to.equal(Model.BelongsToOneRelation);
    expect(Conversations.relationMappings.sender.modelClass).to.equal(Users);
    expect(Conversations.relationMappings.sender.join).to.equal({
      from: 'conversations.senderId',
      to: 'users.id'
    });

    expect(Conversations.relationMappings.recipient.relation).to.equal(Model.BelongsToOneRelation);
    expect(Conversations.relationMappings.recipient.modelClass).to.equal(Users);
    expect(Conversations.relationMappings.recipient.join).to.equal({
      from: 'conversations.recipientId',
      to: 'users.id'
    });
  });
});
