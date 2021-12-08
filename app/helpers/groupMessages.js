const GroupConversation = require('../models/groupConversations');
const moment = require('moment');

const getMessagesByGroupConversationId = async function (id) {
  const res = {};
  try {
    const conversation = await GroupConversation.query()
      .findById(id);
    const messages = await conversation.$relatedQuery('groupMessages');
    res.err = false;
    res.message = 'Messages found';
    res.data = messages;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'No Messages found';
    res.data = null;
    return res;
  }
};

const createGroupMessage = async function (data) {
  const res = {};
  const {senderId, groupConversationId, content} = data;
  try {
    // Conversation existence check
    const groupConversation = await GroupConversation.query().findById(groupConversationId);
    if (!groupConversation) {
      res.err = true;
      res.message = 'Conversation does not exists';
      res.data = null;
      return res;
    }
    const isGroupParticipant = await groupConversation.$relatedQuery('participants')
      .findOne({id: senderId});

    if (!isGroupParticipant) {
      res.err = true;
      res.message = 'Cannot send a message in a conversation where you are not a member in';
      res.data = null;
      return res;
    }

    const senderMessage = await groupConversation.$relatedQuery('groupMessages').insert(
      {
        senderId,
        content,
        read: JSON.stringify([{read_by: senderId, read_at: moment().format().toString()}])
        // Sender should already read own message on send
      }
    );

    res.err = false;
    res.message = 'Message sent';
    res.data = groupConversation;
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
  getMessagesByGroupConversationId,
  createGroupMessage
};
