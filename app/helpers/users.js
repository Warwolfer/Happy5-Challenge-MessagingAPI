const Users = require('../models/users');

const getUsers = async function () {
  const res = {};
  try {
    const user = await Users.query();
    res.err = false;
    res.message = 'Users found';
    res.data = user;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'No Users found';
    res.data = null;
    return res;
  }
};

const createUser = async function (data) {
  console.log(data);
  const res = {};
  try {
    const user = await Users.query().insert(data);
    res.err = false;
    res.message = 'Users created';
    res.data = user;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'Failed to create user';
    res.data = null;
    return res;
  }
};

module.exports = {
  getUsers,
  createUser
};
