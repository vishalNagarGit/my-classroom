import React from 'react';
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { IS_USER_LOGGED_IN } from '../../actions/types';

export default function Navbar() {

    var isUserLoggedIn = useSelector(state => state.signup.is_user_logged_in);
    const dispatch = useDispatch();

    const logout = () => {
        console.log("logout");
        fetch("/logout")
            .then(data => {
                if (data.status == 200)
                    dispatch({ type: IS_USER_LOGGED_IN, payload: false });
            })
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">MyClass</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <button type="button" id="logoutButton" class="btn btn-outline-danger" onClick={logout} >Logout</button>
                </div>
            </nav>
        </div>
    )
}
