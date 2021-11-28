import React from 'react';
import "./index.css";

// showing pending quiz with take quiz button
export default function QuizTile(props) {
    

    function chooseQuiz(){
        props.setQuizIndex(props.index);
        props.setQuizActive(true);
    }

    return (
        <div className="quiz-tile">
              <p>{`${props.quiz.quizName}  From ${props.quiz.teamName}`}</p>
              <button type="button" className="btn btn-outline-success" onClick={chooseQuiz}>Take Quiz</button>
        </div>
    )
}
