import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import TournamentItem from "./TrntItem";

const TournamentList = observer(() => {
    const {tournament} = useContext(Context)

    return (
        <Row className="d-flex ms-2">
            {tournament.tournaments.map(tournament =>
                <TournamentItem key={tournament.id} tournament={tournament} />   
            )}
        </Row>
    )
})

export default TournamentList