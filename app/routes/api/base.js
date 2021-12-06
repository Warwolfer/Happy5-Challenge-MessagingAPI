module.exports = [{
  method: 'GET',
  path: '/',
  handler: function () {
    return 'API is running!';
  },
  options: {
    auth: false
  }
}];
