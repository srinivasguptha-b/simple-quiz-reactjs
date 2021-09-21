import React, { useEffect, useState, useContext } from 'react';
import AppContext from './libs/contextLib';
import { Card } from 'react-bootstrap';

const WinnerList = () => {
    const [winners, setWinners] = useState([]);
    const currentVideo = parseInt(window.location.pathname.split('/').pop());
    const { contentLanguage, isAuthenticated, resultType } = useContext(AppContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=winnersList`).then(response => response.json())
            .then(d => {
                setWinners(d.data.filter(v => v.id != currentVideo));
            });
    }, [currentVideo]);
    return (
        <>
            {winners.length > 0 ? <div className="row m-0 py-2 p-md-4">
                <hr className="m-0 mb-1"></hr>
                <div className="oidw-heading  d-flex align-items-center fw-bold ps-0 pb-2">
                    <span>Previous Contest Winners</span>
                </div>
                <div className='col-md-12 oidw-morevideos-block winners-block p-0 m-0'>
                    <div className="row">

                        {winners.map((videoq, i) => {
                            //let video = videoq.videos[contentLanguage];
                            let result_date = videoq.result_date;
                            return (
                                <div className="row m-2">
                                    <b>Contest {videoq.id}</b>
                                    {videoq.winner.map(winner => <div className="col-md-4 col-sm-12 p-md-2 text-dark pe-0" key={i}>
                                        <Card style={{ background: "#eaf1fa" }}>
                                            <Card.Body>
                                                <div className="winner-thumb" style={{ width: "50px", height: "50px" }}><img src={winner.image ? winner.image : process.env.PUBLIC_URL + '/user.jpeg'} alt="" /></div>
                                                <Card.Text className="m-0">Contest {videoq.id}: Winner</Card.Text>
                                                <Card.Text className="fw-bold m-0"><span className="fw-bold">{winner.name}<small>{winner.alternate ? " (alternate)" : ""}</small></span></Card.Text>
                                                <Card.Text className="m-0">{result_date}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>)}

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