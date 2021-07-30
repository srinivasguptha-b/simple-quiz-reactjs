import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AppContext from './libs/contextLib';
import NextQueue from './NextQueue';
import LoginPage from './LoginPage';
const Home = () => {
    const { isAuthenticated, userData } = useContext(AppContext);
    const [totalScore, setTotalScore] = useState(0);
    const [participated, setParticipated] = useState(0);
    const [activeQuiz, setActiveQuiz] = useState(0);
    useEffect(function () {
        const requestOptionsTotal = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                func: 'getTotalScore', data: {
                    user_id: userData.user_id
                }
            })
        };
        fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptionsTotal).then(response => response.json())
            .then(d => {
                if (!d.error) {
                    setTotalScore(d.data.score_count);
                    setParticipated(d.data.participated);
                    setActiveQuiz(d.data.activeQuiz)
                }
            });
    }, [isAuthenticated])
    return (
        <>
            <Container>
                <div className='row p-5 my-5 text-white rounded'>
                    <div className='col-md-12 text-center'>
                        {isAuthenticated ? (
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
                            )}
                    </div>
                </div>
                <div className='col-md-12 oidw-morevideos-block'>
                    <NextQueue video_id={10} />
                </div>
            </Container>
        </>
    );
}

export default Home;