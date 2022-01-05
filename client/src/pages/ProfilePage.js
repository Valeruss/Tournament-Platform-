import React, { useEffect, useState } from "react";
import { Col, Container, Badge, Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProfile } from "../http/profileAPI";
import { useHistory } from "react-router";
import { PROFILE_ROUTE } from "../utils/consts";
import arrow_left_icon from "../assets/arrow_left_icon.png"

const ProfilePage = () => {
    const history = useHistory()
    const [user, setUser] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneProfile(id).then(data => setUser(data))
    }, [])
    
    return (
        <div>
            <Button 
                variant="outline"
                onClick={() => history.push(PROFILE_ROUTE)}
            >
                <Image width={20} height={20} src={arrow_left_icon}/>
            </Button>

            <Container>
                <Col>
                    <div className="d-flex m-2 mt-1"><h4>
                        <div className="mt-2">
                            {
                                user.role === 'USER' ?                                
                                    <Badge bg="secondary">User</Badge>
                                    :
                                    <Badge bg="danger">Admin</Badge>
                            }
                        </div></h4>
                        <h1 className="ms-3">{user.nickname}</h1>
                    </div>

                    <div className="mt-5">
                        <h5>ID: {user.id}</h5>
                        <h5>Tournaments played: {user.tournaments_played}</h5>
                        <h5>Total wins: {user.total_wins}</h5>
                        <h5>Winrate: {(user.total_wins / user.tournaments_played).toFixed(4)*100 + '%' }</h5>
                    </div>
                </Col>
            </Container>
        </div>
        
    )
}

export default ProfilePage