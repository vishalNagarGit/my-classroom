const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const MessageSchema = new Schema({
    type: String,
    userId: ObjectId,
    username: String,
    message: String,
    timestamp: String,
    fileName: { type: String, default: null }
});

const Message = connection.model('Message', MessageSchema);

module.exports = Message;