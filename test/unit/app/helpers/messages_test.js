const sinon = require('sinon');
const {expect} = require('@hapi/code');
const messagesHelper = require('../../../../app/helpers/messages');
const Conversations = require('../../../../app/models/conversations');
const {stubQuery} = require('../../objection_stub');

describe('Messages Helper', () => {
  describe('getMessagesByConversationId', () => {
    it('should handle success', async () => {
      sinon.stub(Conversations, 'query').returns({
        findById: sinon.stub().resolves({
          $relatedQuery: sinon.stub().resolves([{count: 1}]),
        })
      });
      const result = await messagesHelper.getMessagesByConversationId('testId');
      expect(result.err).to.equal(false);
      Conversations.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Conversations, isException: true
      });
      const result = await messagesHelper.getMessagesByConversationId('testId');
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
  });

  describe('createMessage', () => {
    it('should handle success', async () => {
      let callback = sinon.stub(Conversations, 'query');
      callback.onCall(0).returns({
        findById: sinon.stub().resolves({
          $relatedQuery: sinon.stub().returnsThis(),
          insert: sinon.stub().resolves(true),
        })
      });
      callback.onCall(1).returns({
        findOne: sinon.stub().resolves(null),
      });
      callback.onCall(2).returns({
        insertAndFetch: sinon.stub().resolves({
          $relatedQuery: sinon.stub().returnsThis(),
          insert: sinon.stub().resolves(true),
        }),
      });
      const result = await messagesHelper.createMessage('testId');
      expect(result.err).to.equal(false);
      Conversations.query.restore();
    });
    it('should handle conversation does not exist', async () => {
      sinon.stub(Conversations, 'query').returns({
        findById: sinon.stub().resolves(null)
      });
      const result = await messagesHelper.createMessage({name: 'test'});
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Conversations, isException: true
      });
      const result = await messagesHelper.createMessage({name: 'test'});
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
  });
});
