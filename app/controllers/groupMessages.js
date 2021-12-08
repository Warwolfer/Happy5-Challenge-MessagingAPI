const groupMessageHelper = require('../helpers/groupMessages');

const getMessagesByGroupConversationId = async function (request, res) {
  const id = request.params.id;
  const messages = await groupMessageHelper.getMessagesByGroupConversationId(id);
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

const createGroupMessage = async function (request, res) {
  const messages = await groupMessageHelper.createGroupMessage(request.payload);
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
  getMessagesByGroupConversationId,
  createGroupMessage
};

