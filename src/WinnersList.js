import React, { useEffect, useState, useContext } from 'react';
import AppContext from './libs/contextLib';
import { Card } from 'react-bootstrap';

const WinnerList = () => {
    const [winners, setWinners] = useState([]);
    const { contentLanguage } = useContext(AppContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=winnersList`).then(response => response.json())
            .then(d => {
                setWinners(d.data);
            });
    }, []);
    return (
        <div className="row m-0 p-2 p-md-4" style={{ backgroundColor: "black" }}>
            <div className="oidw-heading text-white d-flex align-items-center fw-bold">
                <i className="oidw-winnercup-icon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/cup-icon.png)" }}></i>
                <span>Previous Contest &amp; Winners</span>
            </div>
            <div className='col-md-12 oidw-morevideos-block winners-block'>
                <div className="row">
                    {winners.map((videoq, i) => {
                        let video = videoq.videos[contentLanguage];
                        return (
                            <div className="col-md-4 col-sm-12 p-md-4 text-dark" key={i}>
                                <Card style={{ background: "transparent" }}>
                                    <Card.Img variant="top" src={video.image} />
                                    <Card.Body>
                                        <Card.Text href={video.video_url} style={{ color: "#FFF" }} >{video.title}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-white bg-dark">
                                        <i className="oidw-winnericon" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/winner-icon.png)" }}></i> Winner : <span className="fw-bold">{videoq.winner.name}</span>
                                    </Card.Footer>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default WinnerList;