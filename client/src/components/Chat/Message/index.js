import React from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";

// this component is a card which shows any perticaular message in team's chat section
// it contains username and time samp along with message detail
export default function Index(props) {
    
    function getAlignment(){
        if(props.msgUserId==props.currUserId)return 'flex-end';
        return 'flex-start';
    }
    
    return (
        <div className="message" style={{'alignItems':getAlignment()}}>
            <div class="messagecard">
                <div class="card-body">
                    <h6 class="card-title" ><span>{props.username}</span> <span><pre>{props.timestamp}</pre></span></h6>

                    {props.type != 'file' && <p class="card-text">{props.message}</p>}
                    {props.type == 'file' && <p class="card-text"><a href={props.message}>{props.fileName}</a></p>}
                </div>
            </div>
        </div>
    )
}