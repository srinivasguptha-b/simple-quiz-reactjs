import React from 'react';
import { Container } from 'react-bootstrap';
import LoginPage from './LoginPage';
import WelcomeText from './WelcomeText';
const Home = () => {
    return (
        <>
            <Container>
                <div className='row'>
                    <div className='col-md-12 text-center p-0'>
                        <WelcomeText />
                        <div className="win-chance mt-3">
                            <div className="win-title">Chance to win</div>
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
                        <div className="google-signin-block mt-4">
                            <div className="signin-title">Ready to get started?</div>
                            <div className="google-signin-btn">
                                <LoginPage />
                            </div>
                            <div className="signin-bottom-text">
                                Sign up and start answering the question. (Gift card will be sent to this Google mail ID)
                            </div>
                        </div>
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