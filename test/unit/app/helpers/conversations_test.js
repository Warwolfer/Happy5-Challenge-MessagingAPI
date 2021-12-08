const sinon = require('sinon');
const {expect} = require('@hapi/code');
const conversationsHelper = require('../../../../app/helpers/conversations');
const Conversations = require('../../../../app/models/conversations');
const {stubQuery} = require('../../objection_stub');

describe('Conversations Helper', () => {
  describe('getConversationsByUserId', () => {
    it('should handle success', async () => {
      sinon.stub(Conversations, 'query').returns({
        where: sinon.stub().resolves([
          {
            $relatedQuery: sinon.stub().returnsThis(),
            orderBy: sinon.stub().returnsThis(),
            first: sinon.stub().resolves('lastChat'),
            whereNull: sinon.stub().returnsThis('lastChat'),
            count: sinon.stub().resolves([{count: 1}]),
          }
        ])
      });
      const result = await conversationsHelper.getConversationsByUserId('testId');
      expect(result.err).to.equal(false);
      Conversations.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Conversations, isException: true
      });
      const result = await conversationsHelper.getConversationsByUserId('testId');
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
  });

  describe('createConversation', () => {
    it('should handle success', async () => {
      let callback = sinon.stub(Conversations, 'query');
      callback.onCall(0).returns({
        findOne: sinon.stub().resolves(null),
      });
      callback.onCall(1).returns({
        insert: sinon.stub().resolves(true),
      });
      callback.onCall(2).returns({
        insert: sinon.stub().resolves(true),
      });
      const result = await conversationsHelper.createConversation('testId');
      expect(result.err).to.equal(false);
      Conversations.query.restore();
    });
    it('should handle conversation already exists', async () => {
      sinon.stub(Conversations, 'query').returns({
        findOne: sinon.stub().resolves(true)
      });
      const result = await conversationsHelper.createConversation({name: 'test'});
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
    it('should handle trying to start conversation with yourself', async () => {
      const result = await conversationsHelper.createConversation({senderId: 'test', recipientId: 'test'});
      expect(result.err).to.equal(true);
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Conversations, isException: true
      });
      const result = await conversationsHelper.createConversation({name: 'test'});
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
  });

  describe('readConversation', () => {
    it('should handle success', async () => {
      stubQuery({
        model: Conversations, result: {
          name: 'test',
          $relatedQuery: sinon.stub().returnsThis(),
          whereNull: sinon.stub().returnsThis(),
          patch: sinon.stub().resolves(true)
        }
      });
      const result = await conversationsHelper.readConversation('test');
      expect(result.err).to.equal(false);
      Conversations.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Conversations, isException: true
      });
      const result = await conversationsHelper.readConversation('test');
      expect(result.err).to.equal(true);
      Conversations.query.restore();
    });
  });
});
