import { React, useState } from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Index(props) {

    function handleSubmit(event) {
        event.preventDefault();
        const res = {
            teamName: event.target.teamname.value,
            teamDescription: event.target.teamdescription.value
        }
        axios.post('/team/create', res)
            .then(data => {
                console.log(data);
                if (data.status == 200) {
                    alert(data.data);
                    setTeamName(""); setTeamDescription("");
                    props.setjoinedOrCreated(true);
                }
            })
            .catch(err => {
                console.log(err);
                alert("error while creating team");
            });
    }

    const [teamName, setTeamName] = useState();
    const [teamDescription, setTeamDescription] = useState();

    return (
        <div class="card createCard" style={{ width: "18rem" }}>
            <div class="modal fade" id="exampleid" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create Team</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times; </span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="teamname" value={teamName} onChange={(e) => setTeamName(e.target.value)} className="teamname" placeholder="Enter team name" />
                            <input type="text" name="teamdescription" value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} placeholder="Enter team description" />
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Create team</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleid">
                Create Team
            </button>
        </div>
    )
}