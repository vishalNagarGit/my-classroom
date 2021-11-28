import React from 'react';
import { useState } from 'react';
import "./index.css";


export default function QuestionForm(props) {

    const [question,setQuestion] = useState('');
    const [optionA,setOption1] = useState('');
    const [optionB,setOption2] = useState('');
    const [optionC,setOption3] = useState('');
    const [optionD,setOption4] = useState('');
    const [correct,setCorrect] = useState('');
    
    // const [questions,setQuestions] = useState([]);

    function handleChange(e){
        const [name,value]=[e.target.name,e.target.value];
        switch(name){
           case "question":setQuestion(value);break;
           case "optionA" : setOption1(value);break; 
           case "optionB" : setOption2(value);break;
           case "optionC" : setOption3(value);break;
           case "optionD" : setOption4(value);break;
           case "correct" : setCorrect(value);break;

       }
    }

    function handleAdd(e){
        e.preventDefault();

        props.setQuestions(state=>[...state,{question,optionA,optionB,optionC,optionD,answer:correct}]);
        // props.questions.push({
        //     question,optionA,optionB,optionC,optionD,correct
        // });

        // console.log(questions);
        setCorrect("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setQuestion("");
    }


    return (
        <div className="question-form-container">
            <form className="question-form" onSubmit={handleAdd} >
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Question:</label>
                    <div class="col-sm-10">

                        <input type="text" 
                                class="form-control form-control-sm" 
                                placeholder="Enter question..." 
                                value={question}
                                name="question"
                                onChange={handleChange}
                                required
                        />

                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Option 1:</label>
                    <div class="col-sm-10">
                         
                         <input type="text" 
                                class="form-control form-control-sm" 
                                placeholder="option A" 
                                value={optionA}
                                name="optionA"
                                onChange={handleChange}
                                required
                        />

                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Option 2:</label>
                    <div class="col-sm-10">
                            <input type="text" 
                                    class="form-control form-control-sm"  
                                    placeholder="option B" 
                                    value={optionB}
                                    name="optionB"
                                    onChange={handleChange}
                                    required
                                    />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Option 3:</label>
                    <div class="col-sm-10">
                            <input  type="text" 
                                    class="form-control form-control-sm"  
                                    placeholder="option C" 
                                    value={optionC}
                                    name = "optionC" 
                                    onChange={handleChange}
                                    required
                                    />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Option 4:</label>
                    <div class="col-sm-10">
                            <input type="text" 
                                    class="form-control form-control-sm"  
                                    placeholder="option D" 
                                    value={optionD}
                                    name="optionD"
                                    onChange={handleChange}
                                    required
                                    />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Answer:</label>
                    <div class="col-sm-8">
                            <input type="text" 
                                    class="form-control form-control-sm"  
                                    placeholder="correct Answer" 
                                    value={correct}
                                    name="correct"
                                    onChange={handleChange}
                                    required
                                    /> 
                    </div>
                    <button type="submit" class="col-sm-2 btn btn-primary">Add</button>
                </div>
             </form>   
        </div>
    )
}
