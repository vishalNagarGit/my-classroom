import React, {useState} from 'react';
import "./index.css";
import Question from "./Question";
import axios from 'axios';

export default function QuizPage(props) {
    
    // score variable calculate score for the attempting quiz
    const [score,setScore]=useState(0);

    // handling the submission of quiz 
    function handleSubmit(){
                const submission={
                    teamId:props.quiz.teamId,
                    quizId:props.quiz._id,
                    teamName:props.quiz.teamName,
                    quizName:props.quiz.quizName,
                    score:score
                }

                axios.post('/quiz/submitresponse', submission)
                        .then(data => {
                            if (data.status == 200) {
                                alert(data.data);
                                props.setQuizActive(false);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert("error while submitting quiz");
                        });


        
    }// handling ends

    return (
       
            <div className="quiz-question-list">
                <h4 style={{alignSelf:"center"}}><u>{props.quiz.quizName}</u></h4>
                {
                    props.quiz.questions.map((question,index)=><Question
                                                question={question.question}
                                                optionA={question.optionA}
                                                optionB= {question.optionB}
                                                optionC= {question.optionC}
                                                optionD= {question.optionD}
                                                answer=  {question.answer}
                                                setScore={setScore}
                                                score={score}
                                                index={index}
                                            />)
                }

                <button type="button" class="btn btn-success submit-button"  onClick={handleSubmit}>Submit Quiz</button>
            </div>

    )
}
