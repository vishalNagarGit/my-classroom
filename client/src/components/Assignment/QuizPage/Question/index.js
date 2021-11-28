import React,{useState} from 'react';

import "./index.css";

export default function Question(props) {

   const [flag,setFlag]=useState(false);

   function handleChange(e){
        if(e.target.value==props.answer){
            setFlag(true);
            props.setScore(state=>state+1);
        }
        
        else{
            console.log(flag);
            if(flag){
                setFlag(false);
                props.setScore(state=>state-1);
            }
        }
        
   }

    return (
        <div className="question">
             <p>Question 1: {props.question}</p>

             <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" value={props.optionA} onChange={handleChange} name={props.index}/>{props.optionA}
                    </label>
            </div>

            <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" value={props.optionB} onChange={handleChange} name={props.index}/>{props.optionB}
                    </label>
            </div>

             <div class="form-check disabled">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" value={props.optionC} onChange={handleChange} name={props.index} />{props.optionC}
                    </label>
            </div>

            <div class="form-check disabled">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" value={props.optionD} onChange={handleChange} name={props.index} />{props.optionD}
                    </label>
            </div>

        </div>
    )
}