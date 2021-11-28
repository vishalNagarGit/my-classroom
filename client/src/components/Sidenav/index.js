import React from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";


// sidenav elements and corresponding components

export default class index extends React.Component {


    updateScreen = (val) => {
       
        this.props.updateScreenProps(val);
        

    }

    render() {
        return (
        <div id="sidenav">
            <ul className="options">
                <li onClick={()=>this.updateScreen("profile")}><i id="profile" class="fa fa-user-circle" ></i></li>
                <li onClick={()=>this.updateScreen("teams")}><i id="teams" class="fa fa-users" ></i></li>
                <li onClick={()=>this.updateScreen("assignment")}><i id="assignment" class="fa fa-file" ></i></li>
                <li id="quizBuilder" onClick={()=>this.updateScreen("quizBuilder")}><i class="fa fa-paperclip"></i></li>
            </ul>
        </div>)
    }
}
