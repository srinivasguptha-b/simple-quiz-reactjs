import React, { useState, useEffect, useContext } from 'react';
import AppContext from './libs/contextLib';
import LoginPage from './LoginPage';
import { Button } from 'react-bootstrap';
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
                                } else {
                                    setShowScore(true);
                                }
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
                const nextQuestion = currentQuestion + 1;
                setAnswered([...answered, currentQuestion]);
                if (nextQuestion < questions.length) {
                    setTimeout(function () { setCurrentQuestion(nextQuestion); }, 1000);
                } else {
                    setTimeout(function () { setShowScore(true); }, 1000);
                }
            });
    };


    const AnswerButton = (answerOption) => {
        let chkvarient = "secondary";
        if (answered.indexOf(currentQuestion) > -1) {
            if (answerOption.isCorrect) {
                chkvarient = "success";
            } else {
                clicked.map(v => {
                    if (v.qtnindex === currentQuestion) {
                        if (v.ansindex === answerOption.index) {
                            chkvarient = "danger"
                        }
                    }
                });
            }

        } else {
            chkvarient = "secondary"
        }
        return (
            <Button variant={chkvarient} className="mb-2 w-100" onClick={() => handleAnswerOptionClick(answerOption)} disabled={(answered.indexOf(currentQuestion) > -1) ? "disabled" : ""}> {answerOption.answerText} </Button>
        );
    }
    return (
        <>
            {!isAuthenticated ? <LoginPage /> : isloading ? <> Please Wait., Loading..!</> :
                <div className='row w-100'>
                    <div className='col-md-3'></div>
                    <div className='main col-md-6 d-flex align-items-center justify-content-center'>

                        {showScore ? (<>
                            <div className='col-md-12 text-center'>
                                <p>You scored {score} out of {questions.length}</p>
                                <p>Participated in {participated}</p>
                                <p>Total scored {totalScore}</p>
                            </div>
                        </>) : (<>
                            <>
                                <div className='col-md-12 mb-2'>
                                    <div className=''>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className=''>{questions[currentQuestion].questionText}</div>
                                </div>
                                <div className='col-md-12'>
                                    {questions[currentQuestion].answerOptions.map((answerOption, i) => (
                                        <div className="w-100" key={i}><AnswerButton index={i} {...answerOption} /></div>
                                    ))}
                                </div>
                            </>
                        </>)}
                    </div>
                    <div className='col-md-3'></div>
                </div>
            }
        </>
    );
}
export default QuizMain;