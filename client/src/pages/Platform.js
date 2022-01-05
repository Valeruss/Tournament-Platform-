import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import OptionBar from "../components/OptionBar";
import Button from "react-bootstrap/Button";
import TournamentList from "../components/TrntList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchTournaments } from "../http/trntAPI";
import Pages from "../components/Pages";


const Platform = observer(() => {
    const {tournament} = useContext(Context)

    useEffect(() => {
        fetchTournaments(null, 1, 5).then(data => {
            tournament.setTournament(data.rows)
            tournament.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchTournaments(tournament.selectedStatus.name, tournament.page, 6).then(data => {
            tournament.setTournament(data.rows)
            tournament.setTotalCount(data.count)
        })
    }, [tournament.page, tournament.selectedStatus])

    return (
        <Container className="col-md-10 ms-auto">
            <h2 className="mt-4 mb-4">Tournaments</h2>
            <OptionBar />
            <TournamentList />
            <Pages/>
        </Container>
    )
})

export default Platform