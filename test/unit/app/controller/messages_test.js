const sinon = require('sinon');
const messageController = require('../../../../app/controllers/messages');
const messageHelper = require('../../../../app/helpers/messages');

describe('Message Controller', () => {
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

  describe('getMessages', () => {
    it('should return success', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(messageHelper, 'getMessagesByConversationId').resolves({err: false});
      const result = await messageController.getMessagesByConversationId(request, reply);
      sinon.assert.match(result.status, true);
      messageHelper.getMessagesByConversationId.restore();
    });
    it('should return failure', async () => {
      let request = {
        params: {
          id: 'test'
        }
      };
      sinon.stub(messageHelper, 'getMessagesByConversationId').resolves({err: true});
      const result = await messageController.getMessagesByConversationId(request, reply);
      sinon.assert.match(result.status, false);
      messageHelper.getMessagesByConversationId.restore();
    });
  });

  describe('createMessage', () => {
    it('should return success', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(messageHelper, 'createMessage').resolves({err: false});
      const result = await messageController.createMessage(request, reply);
      sinon.assert.match(result.status, true);
      messageHelper.createMessage.restore();
    });
    it('should return failure', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(messageHelper, 'createMessage').resolves({err: true});
      const result = await messageController.createMessage(request, reply);
      sinon.assert.match(result.status, false);
      messageHelper.createMessage.restore();
    });
  });

});

