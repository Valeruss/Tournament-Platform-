import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProfile, fetchProfiles } from "../http/profileAPI";
import { Context } from "../index";
import ProfileList from '../components/ProfileList'
import { observer } from "mobx-react-lite";
import PrPages from "../components/PrPages";

const Profile = observer(() => {
    const {user} = useContext(Context)

    useEffect(() => {
        fetchProfiles(1, 2).then(data => {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProfiles(user.page, 10).then(data => {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    }, [user.page])

    return (
        <Container>
            <ProfileList/>
            <PrPages/>
        </Container>
    )
})

export default Profile