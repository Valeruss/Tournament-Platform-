import React, { useContext } from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Context } from "../index";
import card_logo_2 from "../assets/card_logo_2.jpg"
import calendar_icon_1 from "../assets/calendar_icon_1.png"
import size_icon from "../assets/size_icon.png"
import people_icon from "../assets/people_icon.png"
import winner_icon from "../assets/winner_icon.png"
import { useHistory } from "react-router";
import { TOURNAMENT_ROUTE } from "../utils/consts";
import UpdateStatus from "../updateStatus";

const TournamentItem = ({tournament}) => {
    const history = useHistory()

    var trn_date = new Date(tournament.date)
    
    var now_date = new Date()
    var tournament_date = new Date(trn_date.getFullYear(), trn_date.getMonth(), trn_date.getDate())    
    var start_time = tournament.startTime.split(':')
    var end_time = tournament.endTime.split(':')

    const ONE_SECOND = 1000
    const ONE_MINUTE = ONE_SECOND*60
    const ONE_HOUR = ONE_MINUTE*60

    if (now_date.valueOf() < (tournament_date.valueOf() + start_time[0]*ONE_HOUR)) { // до начала турнира
        if (tournament.status !== 'Upcoming') {
            UpdateStatus(tournament, 'Upcoming')
        } else {}
    } else {
        if ((now_date.valueOf() > (tournament_date.valueOf() + start_time[0]*ONE_HOUR)) && 
            (now_date.valueOf() < (tournament_date.valueOf() + end_time[0]*ONE_HOUR))) 
        {
            if (tournament.status !== 'Ongoing') {
                UpdateStatus(tournament, 'Ongoing')
            } else {}
        } else {
            if (tournament.status !== 'Finished') {
                UpdateStatus(tournament, 'Finished')
            } else {}
        }
    }

    return (
        <Col md={4} className={"mt-4"}>
            <Card style={{width: 370, height: 250, cursor: 'pointer'}} onClick={() => history.push(TOURNAMENT_ROUTE + '/' + tournament.id)} >
                
                <Image width={370} height={70} src={card_logo_2} style={{borderRadius: 3}}/>

                <div className="d-flex justify-content-between m-2">
                    <h4>{tournament.name}</h4>
                    <div className="">
                        {
                            tournament.status === 'Upcoming' ?
                                <Badge pill bg="primary">Upcoming</Badge>
                                :
                                tournament.status === 'Ongoing' ?
                                <Badge pill bg="success">Ongoing</Badge>
                                :
                                <Badge pill bg="danger">Finished</Badge>
                        }  
                    </div> 
                </div>

                <div className="m-2">
                    <div className="d-flex align-items-center">
                        <Image width={15} height={15} src={size_icon} className="me-1"/>
                        Size: {tournament.size}
                    </div>
                    <div className="d-flex align-items-center">
                        <Image width={15} height={15} src={people_icon} className="me-1"/>
                        Registered: 
                        {
                            tournament.registeredUsers ?
                            tournament.registeredUsers.length
                            :
                            0
                        }
                    </div>
                    
                    <div className="d-flex align-items-center">
                        <Image width={15} height={15} src={calendar_icon_1} className="me-1"/>
                        Start at: {tournament.date + ' ' + tournament.startTime + '-' + tournament.endTime}
                        {/* ДОДЕЛАТЬ НОРМАЛЬНО */}

                    </div>
                    {
                        tournament.status === 'Finished' ?
                        <div className="d-flex align-items-center">
                            <Image width={15} height={15} src={winner_icon} className="me-1"/>
                            Winner: {tournament.winner}
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </Card>
        </Col>
    )
}

export default TournamentItem