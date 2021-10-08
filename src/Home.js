import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoginPage from './LoginPage';
import WelcomeText from './WelcomeText';
import AppContext from './libs/contextLib';

const HomeVideo = () => {
    const [videoD, setVideoD] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    let history = useHistory();
    let querystring = new URLSearchParams(window.location.search);
    let contentL = querystring.get('lang') ? querystring.get('lang') : "www";
    const { isAuthenticated, modalShow, setModalShow, labelsText } = useContext(AppContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL_GET}?func=getActiveContest`).then(response => response.json())
            .then(d => {
                if (!d.error && d.data.videos) {
                    setVideoD(d.data.videos[contentL]);
                    setActiveVideo(d.data.id);
                }
            });
    }, []);
    useEffect(() => {
        if (isAuthenticated && modalShow) {
            let ulx = (contentL == 'www' || contentL == '') ? "?openQuiz=true" : "?lang=" + contentL + "&openQuiz=true";
            history.push(`${process.env.REACT_APP_API_BASEPATH}` + activeVideo + ulx);
        }
    }, [isAuthenticated]);
    return (<>
        {activeVideo ? <div>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: "0", overflow: "hidden" }}>
                <iframe style={{ width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }} frameBorder="0" type="text/html" src={videoD.embed_url} width="100%" height="100%" allowFullScreen allow="autoplay" >
                </iframe>
            </div>
            <div className="signin-title">
                <button onClick={() => {
                    if (isAuthenticated) {
                        let ulx = (contentL == 'www' || contentL == '') ? "?openQuiz=true" : "?lang=" + contentL + "&openQuiz=true";
                        history.push(`${process.env.REACT_APP_API_BASEPATH}` + activeVideo + ulx);
                    } else {
                        setModalShow(true);
                    }
                }} className="ready-btn">{labelsText.ready_to_play}?</button>
            </div>
        </div> : <></>}
    </>);
}

const Home = () => {
    const { labelsText } = useContext(AppContext);
    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col-md-12 text-center p-0'>
                        {/* <WelcomeText /> */}
                        <div className="win-chance mt-3" style={{ width: "500px" }}>
                            <div className="win-title">{labelsText.chance_to_win}</div>
                            <div className="gift-chance clearfix">
                                <a href="#" className="d-flex flex-row text-decoration-none">
                                    <div className="gift-card align-lt">
                                        <img className="gift-thumb" src={process.env.PUBLIC_URL + '/amazon-pay.png'} alt="" />
                                    </div>
                                    <div className="gift-price align-rt">
                                        <strong>₹ 2000</strong>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* <div>
                            <HomeVideo />
                        </div> */}
                        {/* <div className="google-signin-block mt-4">
                            <div className="signin-title">{labelsText.ready_to_start}?</div>
                            <div className="google-signin-btn">
                                <LoginPage />
                            </div>
                            <div className="signin-bottom-text">
                                {labelsText.sign_up_start}
                            </div>
                        </div> */}
                        {/* {isAuthenticated ? (
                            <>
                                <p>Welcome {userData.name} </p>
                                <h3>Total participated {participated}</h3>
                                <h3>Total Scored {totalScore}</h3>
                                {activeQuiz ?
                                    <a href={process.env.REACT_APP_API_BASEPATH + activeQuiz} className="btn btn-primary">Start Quiz</a>
                                    : <></>}
                            </>
                        ) : (
                                <LoginPage />
                            )} */}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Home;