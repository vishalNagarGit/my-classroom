var express = require('express');
var router = express.Router();
const Team = require('../models/team/model');
const User = require('../models/user/model');
const Quiz = require('../models/quiz/model');
const Score = require('../models/score/model');
const Message = require('../models/message/model');
const Chat = require('../models/chat/model');
const { uploadSingleFile, downloadFIle } = require('../helper/fileUpload');
const fs = require("fs");
var base64ToImage = require('base64-to-image');


// handleling messages sent by user in a perticular joined team
router.post('/sendMessage', (req, res) => {

    const { _id, username } = req.user;
    const { message, timestamp, teamId } = req.body;
    const messageObject = new Message(
        {
            type: 'text',
            userId: _id,
            username: username,
            message: message,
            timestamp: timestamp
        }
    );
    Chat.findOne({ teamId: teamId }, (err, chat) => {
        if (err)
            res.status(200).send("error in message sending");

        if (!chat) {
            chat = new Chat(
                {
                    teamId: teamId,
                    messages: []
                })
        }


        chat.messages.push(messageObject);
        chat.save((err, obj) => {
            if (err) res.status(200).send("messsage not sent");
            else {
                // console.log(obj);
                res.status(200).send("message sent successfully");
            }
        })

    })

})


// get all the messages for a team
router.get('/receiveMessage/:teamId', (req, res) => {

    Chat.findOne({ teamId: req.params.teamId }, (err, chat) => {
        if (err) res.status(200).json([]);
        //console.log(chat);
        if (chat)
            res.status(200).json(chat.messages);
        else
            res.status(200).json([]);
    })

})


// upload file to aws bucket sent by user
router.post('/sendFile', async (req, res) => {

   // console.log('in up');



    const { datetime, teamId } = req.body;
    const { _id, username } = req.user;
    const file = req.files.file;
    const fileName = req.files.file.name;
    const Url = await uploadSingleFile(req.files.file);


    const messageObject = new Message(
        {
            type: 'file',
            userId: _id,
            username: username,
            message: Url,
            timestamp: datetime,
            fileName: fileName
        }
    );
    //console.log(messageObject);
    Chat.findOne({ teamId: teamId }, (err, chat) => {
        if (err)
            res.status(200).send("error in message sending");

        if (!chat) {
            chat = new Chat(
                {
                    teamId: teamId,
                    messages: []
                })
        }


        chat.messages.push(messageObject);
        chat.save((err, obj) => {
            if (err) res.status(200).send("File not sent");
            else {
                // console.log(obj);
                res.status(200).send("File sent successfully");
            }
        })

    })

})


module.exports = router;