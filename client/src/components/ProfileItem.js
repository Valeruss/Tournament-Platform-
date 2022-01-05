import React, { useState } from "react";
import { Button, Col, Container, FormControl, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { PROFILE_ROUTE } from "../utils/consts";
import { Card } from "react-bootstrap";

const ProfileItem = ({user}) => {
    const history = useHistory()

    return (
        <Container>
            <Col md={3} className={"mt-2"} onClick={() => history.push(PROFILE_ROUTE + '/' + user.id)}>
                <Card style={{width: 400, cursor: 'pointer', borderColor: 'black'}}>
                    <div className="m-1 d-flex align-items-center">

                        <div>
                            <span style={{color: 'grey'}} className="me-1 ms-2">ID: </span> 
                            {user.id} 
                        </div>

                        <div className="ms-4">
                            <span style={{color: 'grey'}} className="ms-3 me-2">Nickname: </span> 
                            {user.nickname}
                        </div>

                    </div>
                </Card>
            </Col>
        </Container>
    )
}

export default ProfileItem