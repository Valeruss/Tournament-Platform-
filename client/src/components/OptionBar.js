import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Col, Container, ListGroup, Row, ButtonGroup, Button } from "react-bootstrap";
import { Context } from "../index";

const OptionBar = observer(() => {
    const {tournament} = useContext(Context)
    console.log(tournament.selectedStatus.name)

    return (
        <Container>
            <Row>
                <Col>
                    Status
                    <ListGroup 
                        horizontal
                        md={3}
                    >
                        {tournament.statuses.map(status => 
                            <ListGroup.Item
                                action variant="secondary"
                                active={status.id === tournament.selectedStatus.id}
                                onClick={() => tournament.setSelectedStatus(status)}
                                key={status.id}
                            > {status.name} </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
})

export default OptionBar