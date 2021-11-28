import React, { useEffect } from 'react';
import "./index.css";
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import Card from "./Card";
import JoinCard from "./JoinCard";
import CreateCard from "./CreateCard";
import Chat from "../Chat";
import { useState } from 'react';
import { useSelector} from "react-redux";


// team section 
// includes create & join cards
// creted teams and joined teams cards

export default function Index(props) {

    const [cards, setCards] = useState([]);
    const [myTeams,setMyTeams]= useState([]);
    const [joinedOrCreated, setjoinedOrCreated] = useState(false);
    const [clickedTeamId,setClickedTeamId] = useState("");
    const userId = useSelector(state => state.signup.userId);


    useEffect(() => {
        fetch('/team/joinedteams')
            .then(data => data.json())
            .then(data => { console.log(data); setCards(data) });
        

            fetch('/team/myteams')
            .then(data => data.json())
            .then(data => { console.log("myteams",data); setMyTeams(data) });
        setjoinedOrCreated(false);

    }, [joinedOrCreated]);

    return (
        <div className="team-wrapper">
            {   clickedTeamId==""&&
                <div className="team">
                <h4><em><u>Create or Join Team</u></em></h4>
                <div className='joinOrCreate'>
                <CreateCard
                    setjoinedOrCreated={setjoinedOrCreated}
                />
                <JoinCard
                    setjoinedOrCreated={setjoinedOrCreated}
                />
                </div>
                <h4><em><u>Joined Teams</u></em></h4>
                <div className="joinedTeams">
                
                {
                    cards.map(card =>
                        <Card
                            teamname={card.teamName}
                            description={card.description}
                            teamid={card._id}
                            setClickedTeamId={setClickedTeamId}
                            // updateScreenProps={props.updateScreenProps}
                        />
                    )
                }
                </div>
                <h4><em><u>Created Teams</u></em></h4>
                <div className="myTeams">
                
                {
                    myTeams.map(card =>
                        <Card
                            teamname={card.teamName}
                            description={card.description}
                            teamid={card._id}
                            setClickedTeamId={setClickedTeamId}
                            // updateScreenProps={props.updateScreenProps}
                        />
                    )
                }
                </div>

                </div>
            }

            {
                clickedTeamId!=""&&
                <Chat clickedTeamId={clickedTeamId} />
            }

            
            {/* <div className="team">
                <CreateCard
                    setjoinedOrCreated={setjoinedOrCreated}
                />
                <JoinCard
                    setjoinedOrCreated={setjoinedOrCreated}
                />
                {
                    cards.map(card =>
                        <Card
                            teamname={card.teamName}
                            description={card.description}
                            teamid={card._id}
                            setClickedTeamId={setClickedTeamId}
                            // updateScreenProps={props.updateScreenProps}
                        />
                    )
                }

            </div> */}

        </div>
    )
}
