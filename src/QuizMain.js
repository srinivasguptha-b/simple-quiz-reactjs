import React, { useState, useEffect, useContext } from 'react';
import AppContext from './libs/contextLib';
import NextQueue from './NextQueue';
import NotFound from './NotFound';
import { Button, Image } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { QuestionsData } from './QuestionsData';
import { isMobile } from 'react-device-detect';
const QuizMain = () => {
    let history = useHistory();
    let location = useLocation();
    const { contentLanguage, triggerPageView, triggerEvent } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);
    const { video_url } = useParams();
    const { isAuthenticated, userData, modalShow, setModalShow } = useContext(AppContext);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [participated, setParticipated] = useState(0);
    const [answered, setAnswered] = useState([]);
    const [clicked, setClicked] = useState([]);
    const [answeredCount, setAnsweredCount] = useState(0);
    const currentVideo = video_url;
    const [isloading, setIsLoading] = useState(true);
    const [ansToggle, setAnsToggle] = useState(false);
    const [quizToggle, setQuizToggle] = useState(false);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        if (Object.keys(QuestionsData).includes(contentLanguage)) {
            setQuestions([QuestionsData[contentLanguage][currentVideo - 1]]);
        } else {
            history.push("/");
        }
    }, [contentLanguage])

    useEffect(() => {
        //console.log(Object.keys(QuestionsData).includes(contentLanguage));
        if (isAuthenticated) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    func: 'getThisVideoStatus', data: {
                        user_id: userData.user_id,
                        video_id: video_url
                    }
                })
            };
            fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptions).then(response => response.json())
                .then(d => {
                    setIsLoading(false);
                    if (d.error === -1) {
                        history.push("/");
                    } else {
                        if (d.error === 0) {
                            let answeredCountLocal = d.data.answer_count;
                            let scoreCountLocal = d.data.score_count;

                            if (scoreCountLocal !== "") {
                                setScore(parseInt(scoreCountLocal));
                            }
                            if (answeredCountLocal !== "") {
                                setAnsweredCount(parseInt(answeredCountLocal));
                                if (answeredCountLocal < questions.length) {
                                    setCurrentQuestion(parseInt(answeredCountLocal));
                                    setQuizToggle(true);
                                } else {
                                    setShowScore(true);
                                }
                            }
                            if (d.data.video) {
                                setVideoData(d.data.video);
                            }
                        } else {
                            alert("Something Went wrong, please try again!");
                        }
                    }
                });
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
                    }
                });
        } else {
            setModalShow(false);
            fetch(`${process.env.REACT_APP_API_URL_GET}?func=is_video_exists&video_id=` + currentVideo).then(response => response.json())
                .then(d => {
                    setIsLoading(false);
                    setVideoData(d.data);
                });
        }
    }, [isAuthenticated, showScore, history]);

    const handleAnswerOptionClick = (answerOption) => {
        setClicked([...clicked, { qtnindex: currentQuestion, ansindex: answerOption.index }]);
        if (answerOption.isCorrect) {
            setScore(score + 1);
        }
        setAnsToggle(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                func: 'save_answer', data: {
                    user_id: userData.user_id,
                    question_id: currentQuestion + 1,
                    video_id: currentVideo,
                    answer: answerOption.index,
                    is_correct: answerOption.isCorrect
                }
            })
        };
        fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptions).then(response => response.json())
            .then(d => {
                setAnsweredCount(answeredCount + 1);
                setAnswered([...answered, currentQuestion]);
                // const nextQuestion = currentQuestion + 1;
                // if (nextQuestion < questions.length) {
                //     //setTimeout(function () { setCurrentQuestion(nextQuestion); }, 1000);
                // } else {
                //     //setTimeout(function () { setShowScore(true); }, 1000);
                // }
            });
    };


    const AnswerButtonNew = (answerOption) => {
        let opind = ['A', 'B', 'C', 'D'];
        let chkvarient = "";
        if (answered.indexOf(currentQuestion) > -1) {
            if (answerOption.isCorrect) {
                chkvarient = "correct";
            } else {
                clicked.map(v => {
                    if (v.qtnindex === currentQuestion) {
                        if (v.ansindex === answerOption.index) {
                            chkvarient = "wrong"
                        }
                    }
                });
            }

        } else {
            chkvarient = ""
        }
        return (
            <li className={chkvarient}><div className="w-100 mt-3">
                <div className="option1">
                    <div className="left-option">
                        {opind[answerOption.index]}
                    </div>

                    <Button className="m-0 p-3 w-100 right-option" onClick={() => handleAnswerOptionClick(answerOption)} disabled={(answered.indexOf(currentQuestion) > -1) ? "disabled" : ""}> {answerOption.answerText} </Button>

                </div>
            </div>
            </li>
        )
    }
    const gotoNextQuestion = () => {
        if (ansToggle) {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
            setAnsToggle(false);
            triggerPageView();
            let deviceType = (isMobile) ? 'Mobile' : 'Desktop';
            let labels = { 'www': 'OIEN', 'hindi': 'OIHI', 'tamil': 'OITA', 'telugu': 'OITE', 'kannada': 'OIKN', 'malayalam': 'OIML' };
            triggerEvent('DW Contest', labels[contentLanguage] + ' Video' + currentVideo + ' ' + deviceType, 'Q' + nextQuestion);
            if (location.search == "") {
                history.push(location.pathname + "#" + parseInt(nextQuestion + 1));
            } else {
                history.push(location.pathname + location.search + "#" + parseInt(nextQuestion + 1));
            }
            if (nextQuestion >= questions.length) {
                setTimeout(() => {
                    setQuizToggle(false);
                    setShowScore(false);
                }, 5000);
            }
        }
    }

    const QuizInitPage = () => {
        return (
            <>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: "0", overflow: "hidden" }}>
                    <iframe style={{ width: "100%", height: "100%", position: "absolute", left: "0px", top: "0px", overflow: "hidden" }} frameBorder="0" type="text/html" src={videoData.videos[contentLanguage].embed_url} width="100%" height="100%" allowFullScreen allow="autoplay" >
                    </iframe>
                </div>
                <div className="vid-title m-4">{videoData.videos[contentLanguage].title}</div>
                {showScore && isAuthenticated ? <p className="announcement-p">You have Already answered the quiz, wait for the results</p> : <Button onClick={() => {
                    if (isAuthenticated) {
                        setQuizToggle(true);
                    } else {
                        setModalShow(true);
                        //setQuizToggle(true);
                    }
                }}>Start Quiz</Button>}
            </>
        );
    }

    return (
        <>
            {isloading ? <> Please Wait., Loading..!</> : videoData.length === 0 ? <NotFound /> :
                <>
                    <div className='row w-100 text-white'>
                        <div className='col-md-2'></div>
                        <div className='main col-md-8 d-flex align-items-center justify-content-center'>
                            <div className="col-md-12">
                                <div className="col-md-12 oi-dw-banner d-flex flex-column flex-md-row" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/oidw-header-bg.jpg)" }}>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center oi-dw-logom"><Image src={process.env.PUBLIC_URL + '/oi-dw-logo.png'} fluid /></div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center text-center flex-column oi-dw-amz">
                                        <span className="watchwintext">"Watch to Win Contest"</span>
                                        <div className="oidw-wintext">Win ₹ 2000 Worth <span><img src="Amazon-logo.png" alt="" /></span>Gift Vochers</div>
                                    </div>

                                </div>
                            </div>
                            {!quizToggle || !isAuthenticated ? (<>
                                <div className='col-md-12 text-center mt-4'>
                                    <QuizInitPage />
                                </div>
                            </>) : showScore ? <>
                                <div className="my-4 announcement-p">
                                    <p>Thank you for participating, results will be announced soon.</p>
                                </div>
                            </> : <>
                                        <div className='col-md-12 mb-2'>
                                            <p className="pt-4">
                                                {/* {videoData.title} */}
                                            </p>
                                        </div>
                                        <div className="col-md-12 text-left">
                                            <button type="button" class="btn btn-link text-white ps-0" onClick={() => {
                                                setQuizToggle(false);
                                            }}>watch video</button>
                                        </div>
                                        <div className="col-md-12 oidw-quiz-block p-4">
                                            <div className='mb-2'>
                                                <div className='col-md-12 oidw-quiz-no d-flex flex-row'>
                                                    {/* <div className="col-md-2 text-center"><i>{currentQuestion + 1}</i></div> */}
                                                    <div className='question col-md-10'>Q. {questions[currentQuestion].questionText}</div>
                                                </div>
                                            </div>
                                            <div className='col-md-12 options mb-5'>
                                                <ul>
                                                    {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                                        <AnswerButtonNew index={i} {...answerOption} key={i} />
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="option-bottom clearfix nextques">
                                                <div className="next-question">
                                                    <button type="button" name="button" onClick={gotoNextQuestion}>
                                                        {currentQuestion + 1 < questions.length ? <>
                                                            Next Question <span className="oidw-arrow-right"></span></> : <> Submit </>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-12 oidw-morevideos-block'>
                            <NextQueue video_id={currentVideo} />
                        </div>
                    </div>
                </>
            }
        </>
    );
}
export default QuizMain;