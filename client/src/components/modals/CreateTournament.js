import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { createTournament } from "../../http/trntAPI";

const CreateTournament = observer(({show, onHide}) => {
    const {tournament} = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [size, setSize] = useState(0)
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    // Correct Date and Time check
    var trn_date = new Date(date)
    var now_date = new Date()
    var tournament_date = new Date(trn_date.getFullYear(), trn_date.getMonth(), trn_date.getDate())    
    let correctData = true
    if (tournament_date < now_date) correctData = false
    if (startTime > endTime) correctData = false

    const addTournament = () => {
        if (correctData) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('size', `${size}`)
            formData.append('date', `${date}`)
            formData.append('startTime', `${startTime}`)
            formData.append('endTime', `${endTime}`)
            createTournament(formData).then(data => onHide())
        } else {
            alert('INCORRECT DATA')
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add tournament
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* name */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>Name</h6>
                    <Form.Control 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Tournament Name"
                    />

                    {/* description */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>Description</h6>
                    <Form.Control 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Tournament Description"
                    />

                    {/* size */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>Size</h6>
                    <Form.Control 
                        value={size}
                        onChange={e => setSize(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Size"
                        type="number"
                    />

                    {/* date */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>Date</h6>
                    <Form.Control 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="mt-3"
                        placeholder="Size"
                        type="date"
                    />

                    {/* startTime */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>Start time</h6>
                    <Form.Control 
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className="mt-3"
                        placeholder="Size"
                        type="time"
                    />

                    {/* endTime */}
                    <h6 style={{marginTop: 10, marginBottom: -10}}>End time</h6>
                    <Form.Control 
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        className="mt-3"
                        placeholder="Size"
                        type="time"
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addTournament}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateTournament