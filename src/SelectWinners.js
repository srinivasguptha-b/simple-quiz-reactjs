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
                        <tr><td>Total Participation:</td><td> {parseInt(reports.correct_count) + parseInt(reports.incorrect_count)}</td></tr>
                    </>}
                </tbody>
            </Table>
        </div>
    </>);
}

const SelectWinners = () => {
    const [videoid, setVideoid] = useState('');
    const [emails, setEmails] = useState([]);
    const [uimgs, setUimgs] = useState([]);
    const [winners, setWinners] = useState([]);
    const [modalData, setModalData] = useState({});
    const [currentWinner, setCurrentWinner] = useState(0);
    const maxWinners = 5;

    const getWinnerFromAPI = async (email) => {
        if (videoid) {
            let apiWinner = await fetch(`${process.env.REACT_APP_API_URL_GET}?func=selectWinners&video_id=` + videoid + `&email=` + email).then(response => response.json());
            //console.log(apiWinner);
            if (apiWinner.error == -1) {
                alert(apiWinner.message);
            } else if (!apiWinner.error) {
                return apiWinner.data[0];
            } else {
                if (email)
                    alert('Given Email Id Not Found');
                else
                    alert('Something went wrong!');
            }
        }
        return [];
    }
    const getWinners = async (index) => {
        if (videoid) {
            let tmpmail = (emails[index]) ? emails[index] : "";
            let apiwinner = await getWinnerFromAPI(tmpmail);
            //console.log(apiwinner);
            if (Object.keys(apiwinner).length > 0) {
                //setWinners(wins => ({ ...wins, [index]: apiwinner }));
                setModalData(apiwinner);
                setCurrentWinner(index);

            }
        }
    }
    const submitWinners = () => {
        const requestOptionsTotal = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                func: 'confirmWinner', data: {
                    winners: winners,
                    video_id: videoid
                }
            })
        };
        fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptionsTotal).then(response => response.json())
            .then(d => {
                if (!d.error) {
                    alert("Updated successfully!");
                    window.location.reload();
                }
            });
    }
    let inputList = [];
    for (let i = 1; i <= maxWinners; i++) {
        inputList.push(<tr>
            <td>
                <input value={emails[i]} onChange={(e) => {
                    let value = e.target.value;
                    setEmails(ems => ({ ...ems, [i]: value }))
                }} placeholder="Email" /></td>
            <td><button className="btn btn-info" onClick={() => getWinners(i)}>Select Winner {i}</button></td>
            <td><a href={uimgs[i] ? uimgs[i].replace('=s96-c', '=s960-c') : "#"} target="_blank" title="Download Image"><img src={uimgs[i]} width="30" /></a></td>
            <br></br>
            <br></br>
        </tr>);
    }
    return (
        <>

            <div className="d-flex justify-content-center flex-column">

                <input value={videoid} onChange={(e) => { setVideoid(e.target.value) }} placeholder="contest id" />
                <br></br>
                <table>
                    <tbody>
                        {inputList}
                    </tbody>
                </table>
                <Button variant="warning" onClick={submitWinners}>Submit</Button>
            </div>
            <div className="mt-3">
                <hr></hr>
                <b>Reports</b>
                <TodayReport />
            </div>
            <Modal
                show={Object.keys(modalData).length === 0 ? false : true}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    {Object.keys(modalData).length > 0 ? <Card>
                        <Card.Img variant="top" src={modalData.picture.replace('=s96-c', '=s384-c')} />
                        <Card.Body>
                            <Card.Title>{modalData.name}</Card.Title>
                            <Card.Text >{modalData.email}</Card.Text>
                        </Card.Body>
                    </Card> : ""}
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={() => {
                        setModalData({});
                        setCurrentWinner(0);
                    }}>Close</Button>
                    <Button variant="danger" onClick={() => { getWinners(currentWinner) }}>Reset</Button>
                    <Button variant="success" onClick={() => {
                        setWinners(wins => ({ ...wins, [currentWinner]: modalData }));
                        setEmails(ems => ({ ...ems, [currentWinner]: modalData.email }));
                        setUimgs(ims => ({ ...ims, [currentWinner]: modalData.picture }));
                        setModalData({});
                        setCurrentWinner(0);
                    }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default SelectWinners;