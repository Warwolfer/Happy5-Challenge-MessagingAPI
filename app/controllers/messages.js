const messageHelper = require('../helpers/messages');

const getMessagesByConversationId = async function (request, res) {
  const id = request.params.id;
  const messages = await messageHelper.getMessagesByConversationId(id);
  if (messages.err) {
    return res.response({
      status: false,
      message: messages.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: messages.message,
    data: messages.data
  });
};

const createMessage = async function (request, res) {
  const messages = await messageHelper.createMessage(request.payload);
  if (messages.err) {
    return res.response({
      status: false,
      message: messages.message,
      data: null
    }).code(400);
  }
  return res.response({
    status: true,
    message: messages.message,
    data: messages.data
  });
};


module.exports = {
  getMessagesByConversationId,
  createMessage
};

