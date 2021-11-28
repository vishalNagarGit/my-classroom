const mongoose = require('mongoose');
const connection = require('../../config/database');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;


// joinedTeams: [{ type: ObjectId, ref: 'Team' }],
// createdTeams: [{ type: ObjectId, ref: 'Team' }],

const UserSchema = new Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    vaccinationStatus: Number,
    
    joinedTeams:[
        {
            teamId:{ type: ObjectId, ref: 'Team' },
            teamName:String
        }    
    ],

    createdTeams:[
        {
            teamId:{ type: ObjectId, ref: 'Team' },
            teamName:String
        } 
    ]
    
});



const User = connection.model('User', UserSchema);
module.exports = User;