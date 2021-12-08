const groupConversationHelper = require('../helpers/groupConversations');

const getGroupConversationsByUserId = async function (request, res) {
  const id = request.params.id;
  const groupConversation = await groupConversationHelper.getGroupConversationsByUserId(id);
  if (groupConversation.err) {
    return res.response({
      status: false,
      message: groupConversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: groupConversation.message,
    data: groupConversation.data
  });
};

const createGroupConversation = async function (request, res) {
  const groupConversation = await groupConversationHelper.createGroupConversation(request.payload);
  if (groupConversation.err) {
    return res.response({
      status: false,
      message: groupConversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: groupConversation.message,
    data: groupConversation.data
  });
};

const inviteToGroupConversation = async function (request, res) {
  const groupConversation = await groupConversationHelper.inviteToGroupConversation(request.payload);
  if (groupConversation.err) {
    return res.response({
      status: false,
      message: groupConversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: groupConversation.message,
    data: groupConversation.data
  });
};

const readGroupConversation = async function (request, res) {
  const id = request.params.id;
  const userId = request.payload.userId;
  const groupConversation = await groupConversationHelper.readGroupConversation(id, userId);
  if (groupConversation.err) {
    return res.response({
      status: false,
      message: groupConversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: groupConversation.message,
    data: groupConversation.data
  });
};

module.exports = {
  getGroupConversationsByUserId,
  createGroupConversation,
  readGroupConversation,
  inviteToGroupConversation
};

