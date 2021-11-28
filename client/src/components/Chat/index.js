import React, { useState, useEffect } from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import Message from "./Message";
import axios from "axios";
import fs from "fs";
import {useDispatch,useSelector} from "react-redux";



// this component is contains all the chat window
// all the chats are rendered and props to message component is passed 
// message box and file sharing box is also shown  


export default function Index(props) {
    //<h6>Chat Section {props.clickedTeamId}</h6>
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chosenfile, setChosenFile] = useState();
    const socket = useSelector(state=>state.socket.socket);
    const userId = useSelector(state=>state.signup.userId);
   

    // function to get all the messages for chosen team
    function loadMessages(){
        fetch('/message/receiveMessage/' + props.clickedTeamId)
        .then(data => data.json())
        .then(data => {
            setChats(data);
            console.log(data);  
        });
    }
    

    // listen for any new message
    socket.on('new-msg',()=>loadMessages());
    
    // join the user in current team using socket 
    // and load the messages on component render
    useEffect(() => {
        
        if(socket!=""){
                socket.emit('join-room',props.clickedTeamId);
        }
       
        loadMessages();
        
    }, [socket]);

    // calculate the timestamp of message
    function getTimeStamp() {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        return datetime;
    }
    

    // send the file data to server on file send
    function fileSubmit(e) {
        e.preventDefault();
        console.log(chosenfile);
        const formdata = new FormData();
        formdata.append('file', chosenfile);
        formdata.append('teamId', props.clickedTeamId);
        formdata.append('datetime', getTimeStamp());

        console.log(e.target.result);
        axios({
            method: 'post',
            url: '/message/sendFile',
            data: formdata,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(data => {
            if (data.status == 200) {
                console.log(data);
                e.target.value="";
                socket.emit('new-msg',props.clickedTeamId);
            }
        })
            .catch(err => {
                console.log(err);
                alert("error in upload");
            });



    }

    function fileChange(event) {
        const file = event.target.files[0];
        console.log(event.target.value);
        setChosenFile(file);
    }
    
    function handleSend(e) {
        //send messages to backend
        //use useeffect on chats
        var datetime = getTimeStamp();


        console.log(datetime);
        const newMessageObject = {
            teamId: props.clickedTeamId,
            message: newMessage,
            timestamp: datetime
        };

        //setChats(state => [...state, newMessageObject]);
        axios.post("/message/sendMessage", newMessageObject)
            .then(data => {
                if (data.status == 200) {
                    // alert(data.data);
                    socket.emit('new-msg',props.clickedTeamId);
                }
            })
            .catch(err => {
                console.log(err);

            });
        setNewMessage("");
    }

    return (
        <div className="chat-box">
            <div className="message-box">
                {
                    chats.map(message =>
                        <Message
                            username={message.username}
                            email={message.email}
                            message={message.message}
                            timestamp={message.timestamp}
                            type={message.type}
                            fileName={message.fileName}
                            currUserId={userId}
                            msgUserId={message.userId}  
                        />
                    )
                }
            </div>

            <div className="flex-grow-1 py-3 px-4 border-top type-box">
                <div class="input-group">
                    <input type="text" value={newMessage} name="newmessage" class="form-control" placeholder="Type your message" onChange={e => { setNewMessage(e.target.value) }} />
                    <button class="btn btn-primary" onClick={handleSend}>Send</button>
                    <form action="" id="form1">
                        <input type="file" id="myFile" name="filename" onChange={fileChange} />
                        <button type="submit" form="form1" onClick={fileSubmit}>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


