import React,{useState} from 'react';
import "./index.css";
import axios from "axios";
import {Link} from "react-router-dom";
function Signup() {

const [username, setUsername] = useState('');
const [repeatPassword, setRepeatPassword] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleChange=(e)=>{
    switch(e.target.name){
        case "username": setUsername(e.target.value);break;
        case "email":   setEmail(e.target.value);break;
        case "password": setPassword(e.target.value);break;
        case "repeatPassword":setRepeatPassword(e.target.value);break;
    }
}

const makeStatesEmpty=()=>{
    setUsername("");
    setEmail("");
    setPassword("");
}

const handleSubmit=(e)=>{
    e.preventDefault();
    
    fetch('/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:username,password:password,email:email})
      }).then(res =>res.json())
        .then(res=>{
            if(res.status==200){
                alert("user created!! go to login!!");
                makeStatesEmpty();
            }
            else if(res.status==409){
                alert("user already exists!!");
            }
        })
        .catch(err=>console.log(err));
    }



  return (
       <div className="outer">
       <div className="inner">
           <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={handleChange } value={email}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputUsername">Username</label>
                        <input type="text" class="form-control" id="exampleInputUsername" aria-describedby="useraname" placeholder="Create Username" name="username" onChange={handleChange } value={username}/>
                        <small id="username" class="form-text text-muted">be creative.</small>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={handleChange} value={password}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button> <span style={{float:'right'}}><em><Link to="/login">Login</Link></em></span>
                    </form>
       </div>
       </div>
   
  );
}

export default Signup;
