import React, { useState, useEffect, useContext } from 'react';
import AppContext from './libs/contextLib';
import LoginPage from './LoginPage';
import NextQueue from './NextQueue';
import NotFound from './NotFound';
import { Button, Image } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
const QuizMain = () => {
    let history = useHistory();
    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { answerText: 'Apple', isCorrect: true },
                { answerText: 'Intel', isCorrect: false },
                { answerText: 'Amazon', isCorrect: false },
                { answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { answerText: '1', isCorrect: false },
                { answerText: '4', isCorrect: false },
                { answerText: '6', isCorrect: false },
                { answerText: '7', isCorrect: true },
            ],
        },
    ];
    const { video_url } = useParams();
    const { isAuthenticated, userData } = useContext(AppContext);
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
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
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
                        //history.push("/");
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
        }
    }

    return (
        <>
            {!isAuthenticated ? <LoginPage /> : videoData.length == 0 ? <NotFound /> : isloading ? <> Please Wait., Loading..!</> :
                <>
                    <div className='row w-100 text-white'>
                        <div className='col-md-2'></div>
                        <div className='main col-md-8 d-flex align-items-center justify-content-center'>
                            <div className="col-md-12">
                                <div className="col-md-12 oi-dw-banner d-flex flex-row" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/oidw-header-bg.jpg)" }}>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center"><Image src={process.env.PUBLIC_URL + '/oi-dw-logo.png'} fluid /></div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-center text-center">
                                        <span className="watchwintext">"Watch to Win Contest"</span>
                                    </div>

                                </div>
                            </div>
                            {showScore ? (<>
                                <div className='col-md-12 text-center mt-4'>
                                    <h2 className="mb-3">You scored {score} out of {questions.length}</h2>
                                    <p>Participated in {participated}</p>
                                    <p>Total scored {totalScore}</p>
                                </div>
                            </>) : (<>
                                <div className='col-md-12 mb-2'>
                                    <p className="pt-4">
                                        {videoData.title}
                                    </p>
                                </div>
                                <div className="col-md-12 oidw-quiz-block p-4">
                                    <div className='mb-2'>
                                        <div className='col-md-12 oidw-quiz-no d-flex flex-row'>
                                            <div className="col-md-2 text-center"><i>{currentQuestion + 1}</i></div>
                                            <div className='question col-md-10'>Q. {questions[currentQuestion].questionText}</div>
                                        </div>
                                    </div>
                                    <div className='col-md-12 options mb-5'>
                                        <ul>
                                            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                                <AnswerButtonNew index={i} {...answerOption} />
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="option-bottom clearfix nextques">
                                        <div className="next-question">
                                            <button type="button" name="button" onClick={gotoNextQuestion}>
                                                {currentQuestion + 1 < questions.length ? <>
                                                    Next Question <span className="oidw-arrow-right"></span></> : <> Finish </>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>)}
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