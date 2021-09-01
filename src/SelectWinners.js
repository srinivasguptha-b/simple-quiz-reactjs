import React, { useState, useEffect, useMemo } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

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