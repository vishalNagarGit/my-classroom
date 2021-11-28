import React from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
export default function index(props) {

    function handleClick(e) {
        props.setClickedTeamId(props.teamid);
        // props.updateScreenProps("chat");
    }
    return (
        <div class="card" style={{ width: "18rem" }} onClick={handleClick}>
            <h2 class="card-title">{props.teamname}</h2>
            <p class="card-text">{props.description}</p>
        </div>
    )
}