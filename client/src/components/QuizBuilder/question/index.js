import React from 'react';

import "./index.css";

export default function Question(props) {
    return (
        <div className="question">
             <p>Question 1: {props.question}</p>
             <p>option A : {props.optionA}</p>
             <p>option B : {props.optionB}</p>
             <p>option C : {props.optionC}</p>
             <p>option D : {props.optionD}</p>
             <p>Answer   : {props.Answer}</p>
        </div>
    )
}
