import React, { useState, useEffect } from 'react';
import {
    IS_USER_LOGGED_IN,
    SET_USER_ID
} from '../../actions/types';
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Login() {


    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);

    useEffect(() => {
        fetch('/auth')
            .then(data =>data.json())
            .then(data=> {
                if (data.status == 200) {
                    console.log("auth called",data);
                    dispatch({ type: IS_USER_LOGGED_IN, payload: true });
                    dispatch({type:SET_USER_ID,payload: data.userId});
                }
            });
            

    }, [isUserLoggedIn]);

    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        switch (e.target.name) {
            case "username": setUsername(e.target.value); break;
            case "email": setEmail(e.target.value); break;
            case "password": setPassword(e.target.value); break;
            case "repeatPassword": setRepeatPassword(e.target.value); break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/login", { email: email, password: password })
            .then(data => {
                if (data.status == 200) {
                    alert(data.data.msg);
                    dispatch({ type: IS_USER_LOGGED_IN, payload: true });
                }
            })
            .catch(err => {
                console.log(err);
                alert("wrong email or password");
            });
}
 

    return (
        <div className="outer">
            <div className="inner">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={handleChange} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={handleChange} />
                    </div>

                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button> <span style={{ float: 'right' }}><em><Link to="/signup">Signup</Link></em></span>
                </form>
            </div>



        </div>

    );
}

export default Login;
