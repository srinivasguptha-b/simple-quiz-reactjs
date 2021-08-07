import React, { useContext, useEffect, useState } from 'react';
import AppContext from './libs/contextLib';
import { Card } from 'react-bootstrap';

const NextQueue = ({ video_id }) => {
    const { userData, contentLanguage } = useContext(AppContext);
    const [queuedata, setQuedata] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=getNextVideosList&user_id=` + userData.user_id + '&video_id=' + video_id).then(response => response.json())
            .then(d => {
                setQuedata(d.data);
            });

    }, [userData, video_id]);
    return (
        <div className="row mt-5">
            {queuedata.map((videoq, i) => {
                let video = videoq.videos[contentLanguage];
                return (
                    <div className="col-md-4 col-sm-12 p-2 text-dark" key={i}>
                        <Card style={{ background: "transparent" }}>
                            <Card.Img variant="top" src={video.image} />
                            <Card.Body>
                                <Card.Link href={video.video_url} style={{ color: "#FFF" }} >{video.title}</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

export default NextQueue;