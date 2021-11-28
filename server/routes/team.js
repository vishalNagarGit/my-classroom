var express = require('express');
var router = express.Router();
const Team = require('../models/team/model');
const User = require('../models/user/model');
const Quiz = require('../models/quiz/model');
const { json } = require('express');
const isAuth= require('./authMiddleware').isAuth;

//team creation endpoint
router.post('/create',isAuth, (req, res) => {
    const { teamName, teamDescription } = req.body;
 //   console.log(req._passport.session.user);
    const newTeam = new Team({
        teamName: teamName,
        description: teamDescription,
        admin: req._passport.session.user,
        members: []
    });

    newTeam.save(function (err, result) {
        if (err) {
            result.status = 200;
         //   console.log(result);
            result.send("error in team creation");
        }
        else {
            User.findById(req._passport.session.user, function (err, res) {
                if (err) {
                    console.log(err)
                }
                else {
           //         console.log("Original Doc : ", res);
                    res.createdTeams.push({ teamId: result._id, teamName: result.teamName }); //<----
                    res.save();
                }
            });
        //    console.log(result);
            res.status = 200;
            res.send(result._id);
        }
    });
});


// team joining endpoint
router.post('/join',isAuth, (req, res) => {
    const { teamCode } = req.body;
    Team.findById(teamCode, function (err, team) {
        if (err) {
            res.status = 200;
            //console.log(result);
            res.send("error in team joining");
        }
        else {
           // console.log("Original Team : ", team);
            User.findById(req._passport.session.user, function (err, usr) {
                if (err) {
                    //console.log(err)
                }
                else {
                    //console.log("Original Doc : ", usr);
                    usr.joinedTeams.push({ teamId: team._id, teamName: team.teamName });  ///<---
                    usr.save();
                    team.members.push(usr._id);
                    team.save();
                }
            });
            res.status(200).send("team joined successfully");
        }
    });

});



// fetching teams created by user
router.get('/createdteams',isAuth,(req, res) => {
    User.findById(req._passport.session.user, (err, user) => {
        if (err) {
            res.json([]);
        }

        else {
           // console.log(user);
            res.json(user.createdTeams);
        }

    })
});


// fetching teams joind by user
router.get('/joinedteams',isAuth, (req, res) => {
    User.findById(req._passport.session.user, (err, user) => {
        if (err) {
            res.json([]);
        }

        else {
          //  console.log(user);
            const joinedTeamsid = user.joinedTeams.map(team => team.teamId);
            const joinedTeamsNamewithDescription = [];


            Team.find({ _id: { $in: joinedTeamsid } }, (err, teams) => {
                if (err) res.status(200).json([]);
                res.status(200).json(teams);
            })

        }

    })
});

//fetching all the data of created teams by user
router.get('/myteams',isAuth,(req,res,next) => {
    User.findById(req._passport.session.user, (err, user) => {
        if (err) {
            res.json([]);   
        }

        else {
          //  console.log(user);
            const createdTeamsId = user.createdTeams.map(team => team.teamId);
            


            Team.find({ _id: { $in: createdTeamsId } }, (err, teams) => {
                if (err) res.status(200).json([]);
                res.status(200).json(teams);
            })

        }

    })
});

module.exports = router;
