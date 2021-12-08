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
      const unreadChat = await group.$relatedQuery('groupMessages');
      let count = 0;
      for (const chat of unreadChat) {
        if (chat.read !== null) {
          if (!chat.read.some(e => e.read_by === id)) {
            count += 1;
          }
          group.unreadCount = count;
        }
      }
      group.lastChat = lastChat ? lastChat : {created_at: moment()};
    }
    groups.sort((a, b) => {
      return b.lastChat.created_at - a.lastChat.created_at;
    });
    res.err = false;
    res.message = 'Group Conversations found';
    res.data = groups;
    return res;
  } catch (err) {
    console.log('error dong');
    console.log(err);
    res.err = true;
    res.message = 'No Group Conversations found';
    res.data = null;
    return res;
  }
}
;

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

const readGroupConversation = async function (id, userId) {
  const res = {};
  try {
    const groupConversation = await GroupConversation.query().findById(id);
    if (!groupConversation) {
      res.err = true;
      res.message = 'Conversation does not exists';
      res.data = null;
      return res;
    }
    const isGroupParticipant = await groupConversation.$relatedQuery('participants')
      .findOne({id: userId});

    if (!isGroupParticipant) {
      res.err = true;
      res.message = 'Cannot read a conversation where you are not a member in';
      res.data = null;
      return res;
    }

    const groupMessages = await groupConversation.$relatedQuery('groupMessages');
    for (const message of groupMessages) {
      if (message.read.filter(e => e.read_by !== id).length > 0) {
        // read where haven't read yet
        let read = JSON.stringify([{read_by: id, read_at: moment().format().toString()}, ...message.read]);
        console.log(read);
        await message.$query().patch({read: read});
      }
    }
    res.err = false;
    res.message = 'Conversation read';
    res.data = true;
    return res;
  } catch (err) {
    console.log(err);
    res.err = true;
    res.message = 'Failed to read Conversation';
    res.data = null;
    return res;
  }
};

module.exports = {
  getGroupConversationsByUserId,
  createGroupConversation,
  readGroupConversation,
  inviteToGroupConversation
};
