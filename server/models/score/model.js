const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;


const ScoreSchema = new Schema({
    userId: { type: ObjectId, ref: 'User' },
    quizId: { type: ObjectId, ref: 'Quiz' },
    teamId: { type: ObjectId, ref: 'Team' },
    teamName: String,
    quizName: String,
    score: Number
});

const Score = connection.model('Score', ScoreSchema);
module.exports = Score;