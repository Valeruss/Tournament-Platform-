import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import CreateTournament from "../components/modals/CreateTournament";

const Admin = () => {
    const [tournamentVisible, setTournamentVisible] = useState(false)
    
    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTournamentVisible(true)}
            > Add tournament </Button>

            <CreateTournament show={tournamentVisible} onHide={() => setTournamentVisible(false)}/>
        </Container>
    )
}

export default Admin