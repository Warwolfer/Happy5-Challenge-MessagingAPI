const GroupConversation = require('../models/groupConversations');
const Users = require('../models/users');
const moment = require('moment');

const getGroupConversationsByUserId = async function (id) {
  const res = {};
  try {
    const groups = await GroupConversation.query()
      .joinRelated('participants')
      .where('userId', '=', id)
      .withGraphFetched('participants');
    for (const group of groups) {
      const lastChat = await group.$relatedQuery('groupMessages')
        .orderBy('created_at', 'desc').first();
      // const unreadChat = await group.$relatedQuery('messages')
      //   .whereNull('read_at')
      //   .count();
      group.lastChat = lastChat ? lastChat : {created_at: moment()};
      //user.unreadCount = unreadChat[0].count;
    }
    groups.sort((a, b) => {
      return b.lastChat.created_at - a.lastChat.created_at;
    });
    res.err = false;
    res.message = 'Group Conversations found';
    res.data = groups;
    return res;
  } catch (err) {
    console.log(err);
    res.err = true;
    res.message = 'No Group Conversations found';
    res.data = null;
    return res;
  }
};

const createGroupConversation = async function (data) {
  const res = {};
  try {
    const groupConversation = await GroupConversation.query()
      .insert(data);
    // Also invite the creator as participant
    const inviteToGroup = await groupConversation.$relatedQuery('participants').relate(data.creatorId);
    res.err = false;
    res.message = 'Conversation created';
    res.data = groupConversation;
    return res;
  } catch (err) {
    res.err = true;
    res.message = 'Failed to create Conversation';
    res.data = null;
    return res;
  }
};

const inviteToGroupConversation = async function (data) {
  const res = {};
  try {
    const groupConversation = await GroupConversation.query()
      .findById(data.groupConversationId);
    if (!groupConversation) {
      res.err = true;
      res.message = 'Group Conversation does not exist';
      res.data = null;
      return res;
    }
    const inviteToGroup = await groupConversation
      .$relatedQuery('participants').relate(data.userId);
    res.err = false;
    res.message = `Invited to Group Conversation ${groupConversation.name}`;
    res.data = groupConversation;
    return res;
  } catch (err) {
    console.log(err);
    res.err = true;
    res.message = 'Failed to invite to Group Conversation';
    res.data = null;
    return res;
  }
};

const readConversation = async function (id) {
  const res = {};
  try {
    const conversation = await GroupConversation.query()
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
  getGroupConversationsByUserId,
  createGroupConversation,
  readConversation,
  inviteToGroupConversation
};
