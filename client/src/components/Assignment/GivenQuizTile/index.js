import React from 'react';
import "./index.css";
export default function QuizTile(props) {
    
// show scores for attempted quizzes
    return (
        <div className="quiz-tile">
              <p>{`${props.score.quizName}  From ${props.score.teamName}`}</p>
              <h6>your score: {props.score.score}</h6>
        </div>
    )
}
