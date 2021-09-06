import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { MobileView } from 'react-device-detect';
import { Helmet } from "react-helmet";
import AppContext from './libs/contextLib';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Navmenu from './NavMenu';
import QuizMain from './QuizMain';
import Home from './Home';
import FooterBlock from './FooterBlock';
import SingleAdUnit from './SingelAdUnit';
import WinnersList from './WinnersList';
import SelectWinners from './SelectWinners';
import NotFound from './NotFound';
import { LabelsText } from './LabelsText';


import ReactGa from 'react-ga';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [resultType, setResultType] = useState('');
    let uacodes = {
        'www': 'UA-110466-40',
        'hindi': 'UA-110466-40',
        'tamil': 'UA-110466-40',
        'telugu': 'UA-110466-40',
        'kannada': 'UA-110466-40',
        'malayalam': 'UA-110466-40',
    };
    let ogdesc = {
        'www': {
            desc: "Enter the lucky draw to win Amazon voucher by answering the question correctly"
        },
        'hindi': { desc: "Enter the lucky draw to win Amazon voucher by answering the question correctly" },
        'tamil': { desc: "கேள்விகளுக்கு சரியான பதில்களை அளித்து அமேசான் கூப்பன் வெல்லும் வாய்ப்பை பெறுங்கள்" },
        'telugu': { desc: "అమెజాన్ వోచర్ గెలిచేందుకు ఇచ్చిన ప్రశ్నకు సరైన సమాధానం చెప్పి లక్కీ డ్రాకు అర్హత పొందండి" },
        'kannada': { desc: "ಪ್ರಶ್ನೆಗೆ ಸರಿಯಾಗಿ ಉತ್ತರಿಸಿ ಲಕ್ಕಿ ಡ್ರಾ ಮೂಲಕ ಅಮೆಜಾನ್ ವೋಚರ್ ಗೆದ್ದುಕೊಳ್ಳಿರಿ" },
        'malayalam': { desc: "ശരിയുത്തരം നല്‍കൂ, ആമസോണ്‍ വൗച്ചര്‍ സമ്മാനം ലഭിക്കുന്ന ലക്കി ഡ്രോയില്‍ പങ്കെടുക്കൂ." },
    };
    const [contentLanguage, setContentLanguage] = useState(Object.keys(uacodes)[0]);
    const [labelsText, setSabelsText] = useState(LabelsText[Object.keys(uacodes)[0]]);
    const triggerPageView = () => {
        ReactGa.pageview(window.location.href);
    }
    const triggerEvent = (category, action, label) => {
        ReactGa.event({
            category: category,
            action: action,
            label: label
        });
    }

    useEffect(() => {
        let quizlang = Object.keys(uacodes)[0];
        let querystring = new URLSearchParams(window.location.search);
        if (querystring.get('lang') && Object.keys(uacodes).includes(querystring.get('lang'))) {
            quizlang = querystring.get('lang');
            //localStorage.setItem('quizlang', quizlang);
        } else {
            if (document.referrer !== '' && document.referrer.split('/')[2] !== document.location.host) {
                // quizlang = document.referrer.split('/')[2].split('.')[0]
                // quizlang = Object.keys(uacodes).includes(quizlang) ? quizlang : Object.keys(uacodes)[0];
                //localStorage.setItem('quizlang', quizlang);
            } else {
                // if (localStorage.getItem('quizlang')) {
                //     quizlang = localStorage.getItem('quizlang');
                // }
            }
        }
        // console.log('Referer' + document.referrer);
        // console.log(quizlang);
        setContentLanguage(quizlang);
        setSabelsText(LabelsText[quizlang]);

        ReactGa.initialize(uacodes[quizlang]);
        triggerPageView();
    }, []);

    useEffect(() => {
        const userDataLocal = localStorage.getItem('userdata');
        if (userDataLocal !== "" && userDataLocal !== null) {
            let userDataL = JSON.parse(userDataLocal);
            setIsAuthenticated(true);
            setUserData(userDataL);

            fetch(`${process.env.REACT_APP_API_URL_GET}?func=is_user_exists&user_id=` + userDataL.user_id).then(response => response.json()).then(d => {
                if (d.error) {
                    setIsAuthenticated(false);
                    localStorage.setItem('userdata', '');
                }
            })
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setModalShow(false);
        localStorage.setItem('userdata', '');
    }

    const CreateMeta = () => {
        let quizlang = contentLanguage;
        let qst = quizlang == "www" ? "" : "?lang=" + quizlang;
        let og_url = "https://videos.oneindia.com/dwquiz/" + qst;
        let og_desc = ogdesc[quizlang].desc;
        return (
            <div>
                <Helmet>
                    <link rel="canonical" href={og_url} />
                    <meta property="og:url" content={og_url} />
                    <meta property="og:description" content={og_desc} />
                </Helmet>
            </div>
        );
    }

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={() => {
                return isAuthenticated === true && (userData.email === "srinivasguptha.b@gmail.com" || userData.email === "samraj.m@oneindia.co.in")
                    ? children
                    : <NotFound />
            }} />
        )
    }

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, contentLanguage, setContentLanguage, triggerPageView, triggerEvent, modalShow, setModalShow, handleLogout, resultType, setResultType, labelsText }}>
            <Container className="p-0">
                <CreateMeta />
                <Navmenu />
            </Container>
            <Container className="containerMain">
                <Row>
                    <Col md="12" sm="12">
                        <Router basename='dwquiz-staging'>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <PrivateRoute path="/selectwinner">
                                    <SelectWinners />
                                </PrivateRoute>
                                <Route path="/:video_url" children={<QuizMain />} />
                            </Switch>
                        </Router>
                    </Col>
                </Row>
            </Container>
            <Container className="p-0">
                <WinnersList />
                <FooterBlock />
                <MobileView>
                    <SingleAdUnit size="square" />
                </MobileView>
            </Container>
        </AppContext.Provider>
    );
}