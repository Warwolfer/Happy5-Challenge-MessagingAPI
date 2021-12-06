const Users = require('../models/users');

const getUsers = async function () {
  const res = {};
  try {
    const user = await Users.query();
    console.log(user);
    res.err = false;
    res.message = 'Users Found';
    res.data = user;
    return res;
  } catch (err) {
    console.log(err);
    res.err = true;
    res.message = 'No Users Found';
    res.data = null;
    return res;
  }
};

module.exports = {
  getUsers
};
