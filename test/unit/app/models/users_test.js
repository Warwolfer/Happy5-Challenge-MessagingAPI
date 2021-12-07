const Users = require('../../../../app/models/users');
const {Model} = require('objection');
const sinon = require('sinon');
const {expect} = require('@hapi/code');
const Conversations = require('../../../../app/models/conversations');

describe('User Model', () => {

  it('should have tableName', () => {
    sinon.assert.match(Users.tableName, 'users');
  });

  it('should have jsonSchema', () => {
    sinon.assert.match(Users.jsonSchema, {
      type: 'object',
      required: ['name'],
      properties: {
        id: {type: 'string'},
        name: {type: 'string'},
        created_at: {type: 'string'},
      }
    });
  });

  it('should have relationMappings', () => {
    expect(Users.relationMappings.conversations.relation).to.equal(Model.HasManyRelation);
    expect(Users.relationMappings.conversations.modelClass).to.equal(Conversations);
    expect(Users.relationMappings.conversations.join).to.equal({
      from: 'users.id',
      to: 'conversations.senderId'
    });
  });
});
