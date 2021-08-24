import React, { useEffect, useState, useContext } from 'react';
import AppContext from './libs/contextLib';
import { Card } from 'react-bootstrap';

const WinnerList = () => {
    const [winners, setWinners] = useState([]);
    const { contentLanguage, isAuthenticated, resultType } = useContext(AppContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=winnersList`).then(response => response.json())
            .then(d => {
                setWinners(d.data);
            });
    }, []);
    return (
        <>
            {isAuthenticated && resultType === 'success' ? <div className="row m-0 py-2 p-md-4">
                <hr className="m-0 mb-1"></hr>
                <div className="oidw-heading  d-flex align-items-center fw-bold">
                    <span>Previous Contest &amp; Winners</span>
                </div>
                <div className='col-md-12 oidw-morevideos-block winners-block p-0 m-0'>
                    <div className="row">
                        {winners.map((videoq, i) => {
                            let video = videoq.videos[contentLanguage];
                            return (
                                <div className="col-md-4 col-sm-12 p-md-4 text-dark pe-0" key={i}>
                                    <Card style={{ background: "#eaf1fa" }}>
                                        <Card.Body>
                                            <Card.Text className="m-0">Contest {i + 1}: Winner</Card.Text>
                                            <Card.Text className="fw-bold m-0"><span className="fw-bold">{videoq.winner.name}</span></Card.Text>
                                            <Card.Text className="m-0">{videoq.result_date}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> : <></>}
        </>
    );
}
export default WinnerList;