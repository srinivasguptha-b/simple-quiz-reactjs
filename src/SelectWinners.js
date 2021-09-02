import React, { useState, useEffect, useMemo } from 'react';
import { Card, Modal, Button, Form, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const TodayReport = () => {
    const [reports, setReports] = useState({});
    let from_date = new Date().toISOString().slice(0, 10);
    let to_date = new Date().toISOString().slice(0, 10);
    let querystring = new URLSearchParams(window.location.search);
    if (querystring.get('from_date')) {
        from_date = querystring.get('from_date');
    }
    if (querystring.get('to_date')) {
        to_date = querystring.get('to_date');
    }
    const [fromDate, setFromDate] = useState(from_date);
    const [toDate, setToDate] = useState(to_date);
    const getReports = () => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=getReports&from_date=` + fromDate + `&to_date=` + toDate).then(response => response.json()).then(d => {
            if (!d.error) {
                setReports(d.data);
            }
        });
    }
    return (<>
        <div>FROM : <Form.Control type="date" name='date_from' value={fromDate} onChange={(e) => {
            setFromDate(e.target.value)
        }} /></div>
        <div>TO : <Form.Control type="date" name='date_to' value={toDate} onChange={(e) => {
            setToDate(e.target.value)
        }} /></div>
        <div className="text-center my-2"><Button onClick={getReports}>Get Reports</Button></div>
        <div>
            <Table striped bordered hover variant="dark">
                <tbody>
                    {Object.keys(reports).length > 0 && <>
                        <tr><td>New Registrations:</td> <td>{reports.users_count}</td></tr>
                        <tr><td>Correct Answered:</td><td> {reports.correct_count}</td></tr>
                    </>}
                </tbody>
            </Table>
        </div>
    </>);
}

const SelectWinners = () => {
    const [videoid, setVideoid] = useState('');
    const [email, setEmail] = useState('');
    const [winners, setWinners] = useState({});
    const [showModal, setShowModal] = useState(false);
    const getWinners = async () => {
        if (videoid) {
            let winners = await fetch(`${process.env.REACT_APP_API_URL_GET}?func=selectWinners&video_id=` + videoid + `&email=` + email).then(response => response.json());
            if (winners.error == -1) {
                alert("Winner Already Selected! " + winners.data[0].winner.name)
            } else if (!winners.error) {
                setWinners(winners.data[0]);
                setShowModal(true);
            } else {
                if (email)
                    alert('Given Email Id Not Found');
                else
                    alert('Something went wrong!');
            }
        }
    }
    const confirmWinner = () => {
        const requestOptionsTotal = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                func: 'confirmWinner', data: {
                    user: winners,
                    video_id: videoid
                }
            })
        };
        fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptionsTotal).then(response => response.json())
            .then(d => {
                if (!d.error) {
                    alert("Updated successfully!");
                    setTimeout(() => {
                        setShowModal(false);
                    }, 2000)
                }
            });
    }

    return (
        <>

            <div className="d-flex justify-content-center flex-column">

                <input value={videoid} onChange={(e) => { setVideoid(e.target.value) }} placeholder="contest id" />
                <br></br>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <br></br>
                <button className="btn btn-info" onClick={getWinners}>Select Winner</button>
            </div>
            <div className="mt-3">
                <hr></hr>
                <b>Reports</b>
                <TodayReport />
            </div>
            <Modal
                show={showModal}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    {winners.name ? <Card>
                        <Card.Img variant="top" src={winners.picture.replace('=s96-c', '=s384-c')} />
                        <Card.Body>
                            <Card.Title>{winners.name}</Card.Title>
                            <Card.Text >{winners.email}</Card.Text>
                        </Card.Body>
                    </Card> : <></>}
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="danger" onClick={getWinners}>Reset</Button>
                    <Button variant="success" onClick={confirmWinner}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default SelectWinners;