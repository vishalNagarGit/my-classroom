import React, {useState, useEffect} from 'react';
import "./index.css";
import QuestionFrom from "./questionForm";
import Question from "./question";
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux";


// this component handles the making and creation of quiz by the team owner

export default function QuizBuilder() {

    const [asgName,setAsgName] = useState("");
    const [questions,setQuestions] =useState([]);
    const [myTeams,setMyTeams] = useState([]);
    const [chosenTeam,setChosenTeam] = useState({teamId:"default",teamName:""});
    const socket = useSelector(state=>state.socket.socket);

    // fetch all the teams that loggedin user has created
    useEffect(()=>{
        fetch('/team/createdteams')
            .then(data => data.json())
            .then(data=>{setMyTeams(data);});
    },[]);


    // handle assgnment name changes
    function handleAsgChange(e){
        setAsgName(e.target.value);
    }

    // handle chosen team changes
    function handleTeam(e){
        let teamName="";
        myTeams.forEach(team=>{if(team.teamId==e.target.value)teamName=team.teamName;});
       setChosenTeam({teamId:e.target.value,teamName:teamName});
    //    console.log(chosenTeam);
    }
    

    // after adding quiestions 
    // create the quiz after pressing submit button
    function createQuiz(){
        if(chosenTeam==""){
            alert("choose the team!!");
            return;
        }

        if(asgName==""){
            alert("Give a name to assignment!!");return;
        }

        if(questions.length==0){
            alert("Add atleast one question!!");return;
        }

        console.log("create quiz");
        const quizObject={
            teamId:chosenTeam.teamId,
            teamName:chosenTeam.teamName,
            quizName: asgName,
            questions : questions
        }

        /// post quiz to backend
        axios.post('/quiz/createquiz', quizObject)
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    alert(data.data);
                    socket.emit('new-quiz',chosenTeam.teamId);
                    setQuestions([]);setAsgName("");setChosenTeam({teamId:"default",teamName:""});
                }
            })
            .catch(err => {
                console.log(err);
                alert("error while creating quiz");
            });

       // console.log(quizObject);
    }


    return (
        <div className="quizBuilder-container">
            <div className="asg-team">
            <input type="text" value={asgName} id="asg-name" onChange={handleAsgChange} placeholder="Assignment Name"/>
                <select class="form-control form-control-sm" id="teams-dropdown" onChange={handleTeam} required value={chosenTeam.teamId}>
                    <option value="default" name="" selected>choose team</option>
                    {
                        myTeams.map(team=><option value={team.teamId} name={team.teamName}>{team.teamName} </option>)
                    }
                </select>
            </div>
            
            <QuestionFrom 
                setQuestions={setQuestions}
            />
            <div className="question-list">
                <h4 style={{alignSelf:"center"}}><u>Preview</u></h4>
                {
                    questions.length==0&&<p style={{alignSelf:"center"}}>No questions yet...</p>
                }
                {
                    questions.map(question=><Question
                                                question={question.question}
                                                optionA={question.optionA}
                                                optionB= {question.optionB}
                                                optionC= {question.optionC}
                                                optionD= {question.optionD}
                                                Answer=  {question.answer}
                                            />)
                }
            </div>

            <button type="button" class="btn btn-success" onClick={createQuiz}>Create Quiz</button>

        </div>
    )
}
