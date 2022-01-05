import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Tab, Tabs, Button } from "react-bootstrap";
import { Context } from "../index";
import card_logo from "../assets/card_logo.png"
import clock_icon from "../assets/clock_icon.png"
import info_icon from "../assets/info_icon.png"
import size_icon from "../assets/size_icon.png"
import people_icon from "../assets/people_icon.png"
import open_lock_icon from "../assets/open_lock_icon.png"
import closed_lock_icon from "../assets/closed_lock_icon.png"
import winner_icon from "../assets/winner_icon.png"
import arrow_left_icon from "../assets/arrow_left_icon.png"
import { Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneTournament } from "../http/trntAPI";
import { fetchOneProfile } from "../http/profileAPI"
import { TOURNAMENT_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import UpdateRegisteredUsers from "../updateRegisteredUsers";


const TournamentPage = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    
    const [tournament, setTournament] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneTournament(id).then(data => setTournament(data))
    }, [])

    const JoinTournament = (tournament, user) => {
        if (tournament.status === 'Upcoming') {
            if (user.isAuth && (user.authUser.id !== undefined)) {
                if (tournament.registeredUsers) {
                    let c=0
                    for (let i=0; i < tournament.registeredUsers.length; i++) {
                        if (user.authUser.id === tournament.registeredUsers[i]) {
                            c++
                        }
                    }
                    if (c != 0) {
                        alert(`User: '${user.authUser.nickname}' is alredy registered on tournament: '${tournament.name}'`)
                    } else {
                        UpdateRegisteredUsers(tournament, user.authUser)
                        alert('Registered')
                    }
                } else {
                    UpdateRegisteredUsers(tournament, user.authUser)
                    alert('Registered')
                }
            } else {
                alert('Not authorized or undefined')
            }
        } else alert('Tournament is alredy Started or Finished')
        
    }

    const checkRegister = (tournament, user) => {
        for (let i=0; i < tournament.registeredUsers.length; i++) {
            if (user.authUser.id === tournament.registeredUsers[i]) {
                alert(`User: ${user.authUser.nickname} is alredy registered on tournament: ${tournament.name}`)
            }
        }
    }

    return (
        <div>
        <Button 
                variant="outline"
                onClick={() => history.push(TOURNAMENT_ROUTE)}
            >
                <Image width={20} height={20} src={arrow_left_icon}/>
        </Button>
        <Container className="mt-0">
            <Col>
                <Image width="100%" height="303" src={card_logo} />

                <div className="d-flex m-2 mt-3"><h4>
                    <div className="mt-2">
                        {
                            tournament.status === 'Upcoming' ?
                                <Badge pill bg="primary">Upcoming</Badge>
                                :
                            tournament.status === 'Ongoing' ?
                                <Badge pill bg="success">Ongoing</Badge>
                                :
                                <Badge pill bg="danger">Finished</Badge>
                        }
                    </div></h4>
                    
                    <h1 className="ms-3">{tournament.name}</h1>

                    <div className="d-flex align-items-center ms-3">
                        <Image width={15} height={15} src={clock_icon} className="me-1"/>
                        {tournament.date + ' ' + tournament.startTime + '-' + tournament.endTime}       {/* ДОДЕЛАТЬ НОРМАЛЬНО */}
                    </div>
                </div>

                <Button
                    className="ms-5"
                    variant="outline-danger"
                    onClick={() => JoinTournament(tournament, user)}
                >
                    Join tournament
                </Button>

                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3 mt-3">
                    <Tab eventKey="info" title="Information">
                        <div className="d-flex align-items-center mt-4">
                            <Card style={{width: 110, height: 125, background: '#f5f7fa', borderRadius: 7, borderColor: '#f5f7fa'}} className="ms-2">
                                <div className="d-flex align-items-center mt-3 ms-3 me-3">
                                    <Image width={30} height={30} src={size_icon} className=""/>
                                    <h6 className="ms-2 mt-1">Size</h6>
                                </div>
                                <div className="mt-1" style={{marginLeft: 37}}>
                                    <h5>{tournament.size}</h5>
                                </div>
                                <div style={{color: 'grey', marginLeft: 36}}>Slots</div>
                            </Card>

                            <Card style={{width: 150, height: 125, background: '#f5f7fa', borderRadius: 7, borderColor: '#f5f7fa'}} className="ms-4">
                                <div className="d-flex align-items-center mt-3 ms-3 me-3">
                                    <Image width={30} height={30} src={people_icon} className=""/>
                                    <h6 className="ms-2 mt-1">Registered</h6>
                                </div>
                                <div className="mt-1" style={{marginLeft: 65}}>
                                    <h5>
                                    {
                                        tournament.registeredUsers ?
                                        tournament.registeredUsers.length
                                        :
                                        0
                                    }
                                    </h5>
                                </div>
                                <div style={{color: 'grey', marginLeft: 55}}>Users</div>
                            </Card>

                            <Card style={{width: 120, height: 125, background: '#f5f7fa', borderRadius: 7, borderColor: '#f5f7fa'}} className="ms-4">
                                <div className="d-flex align-items-center mt-3 ms-3 me-3">
                                    {
                                        tournament.status === 'Upcoming' ?
                                        <Image width={25} height={25} src={open_lock_icon} className=""/>
                                        :
                                        <Image width={25} height={25} src={closed_lock_icon} className=""/>
                                    }
                                    <h6 className="ms-2 mt-1">Access</h6>
                                </div>
                                <div className="mt-1" style={{marginLeft: 35}}>
                                    {
                                        tournament.status === 'Upcoming' ?
                                        <h5>Open</h5>
                                        :
                                        <h5>Close</h5>
                                    }
                                </div>
                            </Card>

                            {
                                tournament.status === 'Finished' ?
                                    <Card style={{width: 200, height: 125, background: '#f5f7fa', borderRadius: 7, borderColor: 'gold'}} className="ms-5">
                                        <div className="d-flex align-items-center mt-3 ms-3 me-3">
                                            <Image width={25} height={25} src={winner_icon} className=""/>
                                            <h6 className="ms-2 mt-1">Winner</h6>
                                        </div>
                                        <div className="mt-1" style={{marginLeft: 35}}>
                                            <h5>{tournament.winner}</h5>
                                        </div>
                                    </Card>
                                    :
                                    <div></div>
                            }
                        </div>

                    </Tab>
                    <Tab eventKey="participants" title="Participants">
                        <Row className="d-flex flex-column m-3">
                            <h4 className="ms-3">Participants</h4>
                            <h6 style={{color: '#63708a'}} className="ms-3">
                                {
                                    tournament.registeredUsers ?
                                    tournament.registeredUsers.length + ' users'
                                    :
                                    0 + ' users'
                                }
                            </h6>

                            <Row>
                                {
                                    tournament.registeredUsers ?
                                    tournament.registeredUsers.map((user, index) => 
                                    <Card 
                                        key={index} 
                                        style={{borderColor: '#63708a', height: 30, width: 285, marginTop: 10}}
                                        className="ms-4" 
                                    >
                                        <div className="d-flex justify-content-between">
                                            {'ID: ' + tournament.registeredUsers[index] }
                                            <div 
                                                style={{float: 'right', cursor: 'pointer', color: 'blue'}}
                                                onClick={() => history.push(PROFILE_ROUTE + '/' + tournament.registeredUsers[index])}
                                            >
                                                view profile
                                            </div>
                                        </div>
                                    </Card>
                                    )
                                    :
                                    0
                                }
                            </Row>
                        </Row>
                    </Tab>
                </Tabs>

                <Card className="ms-2 p-4" style={{marginTop: 50, borderColor: '#f5f7fa', background: '#f5f7fa', borderRadius: 7,  height: '100%', width: '100%'}}>
                    <h4>Description</h4>
                    <span>{tournament.description}</span>
                </Card>

            </Col>
        </Container>
        </div>
    )
})

export default TournamentPage