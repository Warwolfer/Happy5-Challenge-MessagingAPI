const sinon = require('sinon');
const userController = require('../../../../app/controllers/users');
const userHelper = require('../../../../app/helpers/users');

describe('User Controller', () => {
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

  describe('getUsers', () => {
    it('should return success', async () => {
      sinon.stub(userHelper, 'getUsers').resolves({err: false});
      const result = await userController.getUsers(null, reply);
      sinon.assert.match(result.status, true);
      userHelper.getUsers.restore();
    });
    it('should return failure', async () => {
      sinon.stub(userHelper, 'getUsers').resolves({err: true});
      const result = await userController.getUsers(null, reply);
      sinon.assert.match(result.status, false);
      userHelper.getUsers.restore();
    });
  });

  describe('createUser', () => {
    it('should return success', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(userHelper, 'createUser').resolves({err: false});
      const result = await userController.createUser(request, reply);
      sinon.assert.match(result.status, true);
      userHelper.createUser.restore();
    });
    it('should return failure', async () => {
      let request = {
        payload: {
          id: 'test'
        }
      };
      sinon.stub(userHelper, 'createUser').resolves({err: true});
      const result = await userController.createUser(request, reply);
      sinon.assert.match(result.status, false);
      userHelper.createUser.restore();
    });
  });

});

