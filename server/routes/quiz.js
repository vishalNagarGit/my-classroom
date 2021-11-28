var express = require('express');
var router = express.Router();
const Team = require('../models/team/model');
const User = require('../models/user/model');
const Quiz = require('../models/quiz/model');
const Score = require('../models/score/model');



// take quiz object and create the quiz
router.post('/createquiz',(req,res)=>{
   // console.log(req.body);
    const quiz = new Quiz(req.body);
    quiz.save((err,obj)=>{
        if(err) res.status(200).send("quiz not created");
        else{
           // console.log(obj);
            res.status(200).send("quiz created");
        }
    })
    // res.status(200).send("debug");
});



// fetch the to do quizzes for user according to joined teams
router.get('/todoquizzes',(req,res)=>{
     User.findById(req._passport.session.user,(err,user)=>{
        if(err)res.status("200").json({});

        const joinedTeams = user.joinedTeams.map(team=>team.teamId);
        
         Score.find({userId:req._passport.session.user},(err,scores)=>{
                if(err)res.status("200").json({});
                
                const givenQuizzes = scores.map(score=>score.quizId);

              //  console.log("to do quizzes",givenQuizzes);

                Quiz.find({teamId:{$in:joinedTeams},_id:{$nin:givenQuizzes}},(errr,quizes)=>{
                        if(errr)res.status(200).json({});
                        res.status(200).json(quizes);
                });

         });

     });

//    const quizzes =  Quiz.find({teamId:{$in:user.joinedTeams}});
//    console.log(quizzes);

});


// handle submission of user for a quiz
router.post("/submitresponse",(req,res)=>{
    // console.log(req.body);
    // res.status(200).send("submitted");
    const {teamId,quizId,teamName,quizName,score}=req.body;
    const scoreObj = new Score({
        userId:req._passport.session.user,
        quizId:quizId,
        teamId:teamId,
        teamName:teamName,
        quizName:quizName,
        score:score
    });

    scoreObj.save((err,obj)=>{
        if(err) res.status(200).send("quiz not submitted");
        else{
            // console.log(obj);
            res.status(200).send("quiz submitted");
        }
    })

});

module.exports = router;