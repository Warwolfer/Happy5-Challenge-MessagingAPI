const sinon = require('sinon');
const {expect} = require('@hapi/code');
const usersHelper = require('../../../../app/helpers/users');
const Users = require('../../../../app/models/users');
const {stubQuery} = require('../../objection_stub');

describe('Users Helper', () => {
  describe('getUsers', () => {
    it('should handle success', async () => {
      stubQuery({
        model: Users, result: {name: 'test'}
      });
      const result = await usersHelper.getUsers();
      expect(result.err).to.equal(false);
      Users.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Users, isException: true
      });
      const result = await usersHelper.getUsers();
      expect(result.err).to.equal(true);
      Users.query.restore();
    });
  });

  describe('createUser', () => {
    it('should handle success', async () => {
      stubQuery({
        model: Users, result: {name: 'test'}
      });
      const result = await usersHelper.createUser({name: 'test'});
      expect(result.err).to.equal(false);
      Users.query.restore();
    });
    it('should handle failure', async () => {
      stubQuery({
        model: Users, isException: true
      });
      const result = await usersHelper.createUser({name: 'test'});
      expect(result.err).to.equal(true);
      Users.query.restore();
    });
  });
});
