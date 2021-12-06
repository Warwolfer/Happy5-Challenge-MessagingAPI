const conversationHelper = require('../helpers/conversations');

const getConversationsByUserId = async function (request, res) {
  const id = request.params.id;
  const conversation = await conversationHelper.getConversationsByUserId(id);
  if (conversation.err) {
    return res.response({
      status: false,
      message: conversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: conversation.message,
    data: conversation.data
  });
};

const createConversation = async function (request, res) {
  const conversation = await conversationHelper.createConversation(request.payload);
  if (conversation.err) {
    return res.response({
      status: false,
      message: conversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: conversation.message,
    data: conversation.data
  });
};

const readConversation = async function (request, res) {
  const id = request.params.id;
  const conversation = await conversationHelper.readConversation(id);
  if (conversation.err) {
    return res.response({
      status: false,
      message: conversation.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: conversation.message,
    data: conversation.data
  });
};

module.exports = {
  getConversationsByUserId,
  createConversation,
  readConversation
};

