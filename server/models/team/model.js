const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;


const TeamSchema = new Schema({
    teamName: String,
    description: String,
    admin: { type: ObjectId, ref: 'User' },
    members: [{ type: ObjectId, ref: 'User' }]
});

const Team = connection.model('Team', TeamSchema);
module.exports = Team;