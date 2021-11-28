const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;


const QuizSchema = new Schema({
    teamId: { type: ObjectId, ref: 'Team' },
    quizName: String,
    teamName: String,
    questions: Object
});

const Quiz = connection.model('Quiz', QuizSchema);
module.exports = Quiz;