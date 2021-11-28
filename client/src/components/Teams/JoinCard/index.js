import { React, useState } from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import axios from "axios";


export default function Index(props) {
    const [teamCode, setTeamCode] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.teamcode.value);
        const res = { teamCode: event.target.teamcode.value };
        axios.post('/team/join', res)
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    alert(data.data);
                    setTeamCode("");
                    props.setjoinedOrCreated(true);
                }
            })
            .catch(err => {
                console.log(err);
                alert("error while creating team");
            });

    }



    return (
        <div class="card joinCard" style={{ width: "18rem" }}>
            <div class="modal fade" id="example" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">JoinTeam</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times; </span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="teamcode" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} className="teamname" placeholder="Enter team code" />
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Join team</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#example">
                Join Team
            </button>
        </div>
    )
}