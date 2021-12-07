const sinon = require('sinon');
const createServer = require('../../../app/server');

describe('Run Server', () => {
  it('should validate if server is running', async () => {
    let server = await createServer();
    sinon.assert.match(server.info.port, 3333);
    sinon.assert.match(server.info.host, '0.0.0.0');
    const res = await server.inject({
      method: 'get',
      url: '/'
    });
    sinon.assert.match(res.statusCode, 200);
    await server.stop();
  }).timeout(10000);
});
