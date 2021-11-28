import React, { Component} from 'react';
import Navbar from "../Navbar";
import Sidenav from "../Sidenav";
import { useState, useEffect } from 'react';
import Profile from "../Dashboard/Profile";
import Assignment from "../Assignment";
import Teams from "../Teams";
import Calendar from "../Calendar";
import QuizBuilder from "../QuizBuilder";
import Chat from "../Chat"
import io from 'socket.io-client';
import "./index.css";
import {
    SET_SOCKET
} from '../../actions/types';
import {useDispatch,useSelector} from "react-redux";



// this components capture the selected section from sidenav and renderes the inner component accordingly
function Home() {
    
    const dispatch = useDispatch();
    const [screen,updateScreen]=useState("profile");
    // const [socket, setSocket] = useState(null);
    const userId = useSelector(state => state.signup.userId);
    const socket = useSelector(state=>state.socket.socket);


    useEffect(() => {
      const newSocket = io('/');
    //   setSocket(newSocket);
      dispatch({type:SET_SOCKET,payload: newSocket});
      newSocket.emit('userId',userId);
      return () => newSocket.close();
    }, [userId]);

    

        return (
            <div className="wrapper">
                <div className="topnav">
                    <Navbar />
                </div>

                <div className="bigbox">
                    <Sidenav updateScreenProps={updateScreen} />
                    {screen === "profile" && <Profile />}
                    {screen === "teams" && <Teams/>}
                    {screen === "assignment" && <Assignment />}
                    {screen === "quizBuilder" && <QuizBuilder />}
                    {screen === "chat" && <Chat />}
                </div>

            </div>
        )
    
}

export default Home;