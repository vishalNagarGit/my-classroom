const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const Message = require('../message/model').schema;

const ChatSchema = new Schema({
    teamId: ObjectId,
    messages: [Message]
});



const Chat = connection.model('Chat', ChatSchema);
module.exports = Chat;