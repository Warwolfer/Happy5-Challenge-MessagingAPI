const Conversation = require('../models/conversations');
const moment = require('moment');

const getConversationsByUserId = async function (id) {
  const res = {};
  try {
    const users = await Conversation.query()
      .where('senderId', '=', id);
    for (const user of users) {
      const lastChat = await user.$relatedQuery('messages')
        .orderBy('created_at', 'desc').first();
      const unreadChat = await user.$relatedQuery('messages')
        .whereNull('read_at')
        .count();
      user.lastChat = lastChat;
      user.unreadCount = unreadChat[0].count;
    }
    res.err = false;
    res.message = 'Conversations found';
    res.data = users;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'No Conversations found';
    res.data = null;
    return res;
  }
};

const createConversation = async function (data) {
  const res = {};
  try {
    if (data.senderId == data.recipientId) {
      res.err = true;
      res.message = 'Cannot start a conversation with yourself';
      res.data = null;
      return res;
    }
    const conversationExists = await Conversation.query().findOne(data);
    if (conversationExists) {
      res.err = true;
      res.message = 'Conversation already exists';
      res.data = null;
      return res;
    }
    const conversationSender = await Conversation.query()
      .insert(data);
    // Also create a conversation for the recipient
    const conversationRecipient = await Conversation.query()
      .insert({senderId: data.recipientId, recipientId: data.senderId});
    res.err = false;
    res.message = 'Conversation created';
    res.data = conversationSender;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'Failed to create Conversation';
    res.data = null;
    return res;
  }
};

const readConversation = async function (id) {
  const res = {};
  try {
    const conversation = await Conversation.query()
      .findById(id);
    const update = await conversation.$relatedQuery('messages')
      .whereNull('read_at')
      .patch({read_at: moment().format().toString()});
    res.err = false;
    res.message = 'Conversation read';
    res.data = true;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'Failed to read Conversation';
    res.data = null;
    return res;
  }
};

module.exports = {
  getConversationsByUserId,
  createConversation,
  readConversation
};
