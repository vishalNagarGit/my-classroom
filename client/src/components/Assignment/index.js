import React, { useEffect, useState } from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import quizData from './quizData';
import QuizTile from './QuizTile';
import QuizPage from './QuizPage';
import GivenQuizTile from './GivenQuizTile';
import {useDispatch,useSelector} from "react-redux";

export default function Assignment() {
  
    const [quizActive, setQuizActive] = useState(false);
    const [quizes, setQuizes] = useState([]);
    const [scores, setScores] = useState([]);
    const [quizIndex, setQuizIndex] = useState(-1);
    const socket = useSelector(state=>state.socket.socket);
    const userId = useSelector(state=>state.signup.userId);  

    
    // this function fetches all the scores and pending quiz data from server
    function getQuizzesAndScores(){
            fetch('/quiz/todoquizzes')
            .then(data => data.json())
            .then(data => { console.log(data); setQuizes(data) });

            fetch('/score/allscores')
            .then(data => data.json())
            .then(data => { console.log("scores", data); setScores(data) });
    }
    
    // new-quiz listen for any new quiz posting
    socket.on('new-quiz',()=>{
        getQuizzesAndScores();
        console.log('new-quiz called');
    });

    // fetch scores and quizzes on component render
    useEffect(() => {
            getQuizzesAndScores();
            socket.emit('join-all-teams',userId);
    }, [socket,quizActive]);



    return (
        <div className="assignment-container">
            <div className="assignment-list">
                {!quizActive && <h4><em><u>To do quizzes</u></em></h4>}
                {!quizActive && quizes.length == 0 && <p>good job, no pending quiz!!</p>}

                {
                    !quizActive && quizes.map((quiz, index) => <QuizTile
                        setQuizActive={setQuizActive}
                        quiz={quiz}
                        index={index}
                        setQuizIndex={setQuizIndex}
                    />)
                }

                {!quizActive && <h4><em><u>Attempted quizzes</u></em></h4>}
                {!quizActive && scores.length == 0 && <p>no quizzes given yet</p>}
                {
                    !quizActive && scores.map((score, index) => <GivenQuizTile

                        score={score}

                    />)
                }



            </div>

            <div className="quiz-question-list">
                {
                    quizActive && <QuizPage
                        quiz={quizes[quizIndex]}
                        setQuizActive={setQuizActive}
                    />
                }
            </div>


        </div>
    )
}
