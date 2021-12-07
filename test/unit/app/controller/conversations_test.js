const sinon = require('sinon');
const conversationController = require('../../../../app/controllers/conversations');
const conversationHelper = require('../../../../app/helpers/conversations');

describe('Conversation Controller', () => {
  let reply;
  beforeEach(() => {
    reply = {
      response(params) {
        return {
          ...params,
          code: () => params
        };
      },
    };
  });

  describe('getConversationsByUserId', () => {
    it('should return success', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'getConversationsByUserId').resolves({err: false});
      const result = await conversationController.getConversationsByUserId(request, reply);
      sinon.assert.match(result.status, true);
      conversationHelper.getConversationsByUserId.restore();
    });
    it('should return failure', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'getConversationsByUserId').resolves({err: true});
      const result = await conversationController.getConversationsByUserId(request, reply);
      sinon.assert.match(result.status, false);
      conversationHelper.getConversationsByUserId.restore();
    });
  });

  describe('createConversation', () => {
    it('should return success', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'createConversation').resolves({err: false});
      const result = await conversationController.createConversation(request, reply);
      sinon.assert.match(result.status, true);
      conversationHelper.createConversation.restore();
    });
    it('should return failure', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'createConversation').resolves({err: true});
      const result = await conversationController.createConversation(request, reply);
      sinon.assert.match(result.status, false);
      conversationHelper.createConversation.restore();
    });
  });

  describe('readConversation', () => {
    it('should return success', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'readConversation').resolves({err: false});
      const result = await conversationController.readConversation(request, reply);
      sinon.assert.match(result.status, true);
      conversationHelper.readConversation.restore();
    });
    it('should return failure', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(conversationHelper, 'readConversation').resolves({err: true});
      const result = await conversationController.readConversation(request, reply);
      sinon.assert.match(result.status, false);
      conversationHelper.readConversation.restore();
    });
  });
});

