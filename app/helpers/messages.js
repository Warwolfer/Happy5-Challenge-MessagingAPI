const Conversation = require('../models/conversations');
const moment = require('moment');

const getMessagesByConversationId = async function (id) {
  const res = {};
  try {
    const conversation = await Conversation.query()
      .findById(id);
    const messages = await conversation.$relatedQuery('messages');
    res.err = false;
    res.message = 'Conversations found';
    res.data = messages;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'No Conversations found';
    res.data = null;
    return res;
  }
};

const createMessage = async function (data) {
  const res = {};
  const {senderId, conversationId, content} = data;
  try {
    // Conversation existence check
    const senderConversation = await Conversation.query().findById(conversationId);
    if (!senderConversation) {
      res.err = true;
      res.message = 'Conversation does not exists';
      res.data = null;
      return res;
    }
    if (senderId !== senderConversation.senderId) {
      res.err = true;
      res.message = 'Cannot send a message in a conversation that is not yours';
      res.data = null;
      return res;
    }
    const senderMessage = await senderConversation.$relatedQuery('messages').insert(
      {
        senderId,
        content,
        read_at: moment().format().toString() // Sender should already read own message on send
      }
    );
    // Check if other user is already engaged in a conversation
    let recipientConversation = await Conversation.query().findOne({
      senderId: senderConversation.recipientId,
      recipientId: senderConversation.senderId
    });

    /* istanbul ignore else */
    if (!recipientConversation) {
      // Create a conversation for the recipient if it does not exist yet
      recipientConversation = await Conversation.query()
        .insertAndFetch({senderId: data.recipientId, recipientId: data.senderId});
    }

    // Receive the message
    const recipientMessage = await recipientConversation.$relatedQuery('messages').insert(
      {
        senderId,
        content
      }
    );

    res.err = false;
    res.message = 'Message sent';
    res.data = senderMessage;
    return res;
  } catch (err) {
    console.log(err);
    res.err = true;
    res.message = 'Failed to send message';
    res.data = null;
    return res;
  }
};

module.exports = {
  getMessagesByConversationId,
  createMessage
};
