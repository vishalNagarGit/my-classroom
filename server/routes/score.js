var express = require('express');
var router = express.Router();
const Team = require('../models/team/model');
const User = require('../models/user/model');
const Quiz = require('../models/quiz/model');
const Score = require('../models/score/model');


// get scores for all submitted quizzes
router.get('/allscores',(req,res)=>{

    Score.find({userId:req._passport.session.user},(err,scores)=>{
        if(err)res.status(200).send([]);
        res.status(200).json(scores);
    })

})

module.exports = router;