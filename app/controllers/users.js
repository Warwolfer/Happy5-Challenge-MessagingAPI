const userHelper = require('../helpers/users');

const getUsers = async function (req, res) {
  const user = await userHelper.getUsers();
  if (user.err) {
    return res.response({
      status: false,
      message: user.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: user.message,
    data: user.data
  });
};

module.exports = {
  getUsers
};

