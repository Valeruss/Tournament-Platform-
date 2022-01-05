import React, { useContext, useEffect, useState} from "react";
import { Row, InputGroup, FormControl, Button, Image, Col } from "react-bootstrap";
import { Context } from "../index";
import ProfileItem from "./ProfileItem";
import { observer } from "mobx-react-lite";
import search_icon from '../assets/search_icon.png'
import { fetchOneProfile } from "../http/profileAPI"
import { useHistory } from "react-router";
import { PROFILE_ROUTE } from "../utils/consts";

const ProfileList = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)

    const search = () => {
        var value = document.getElementById('inputText').value
        try {
            fetchOneProfile(value).then((res) => history.push(PROFILE_ROUTE + '/' + res.id))
        } catch (e) {
            return console.log(e)
        }
    }

    return (
        <Row className="d-flex mt-3">

            <div className="d-flex mt-2 mb-2">
                <InputGroup className="" style={{width: 400}}>
                    <InputGroup.Text>@</InputGroup.Text>
                    <FormControl id="inputText" placeholder="Search user by ID" type="search" />
                </InputGroup>

                <Button 
                    className="ms-1"
                    id="searchBtn"
                    variant="outline-secondary" 
                    style={{backgroundColor: '#e9ecef', borderColor: '#ced4da'}}
                    onClick={() => search()}
                >
                    <Image width={15} height={15} src={search_icon}/>
                </Button>

                <Button
                    className="ms-5"
                    onClick={() => history.push(PROFILE_ROUTE + '/' + user.authUser.id)}
                > My profile </Button>
            </div>
           
            {user.usersList.map(user =>
                <ProfileItem key={user.id} user={user} />
            )}
        
        </Row>
    )
})

export default ProfileList