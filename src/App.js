import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { MobileView } from 'react-device-detect';
import AppContext from './libs/contextLib';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Navmenu from './NavMenu';
import QuizMain from './QuizMain';
import Home from './Home';
import FooterBlock from './FooterBlock';
import SingleAdUnit from './SingelAdUnit';
import WinnersList from './WinnersList';
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
            setIsAuthenticated(true);
            let userDataL = JSON.parse(userDataLocal);
            setUserData(userDataL);
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setModalShow(false);
        localStorage.setItem('userdata', '');
    }

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, contentLanguage, setContentLanguage, triggerPageView, triggerEvent, modalShow, setModalShow, handleLogout, resultType, setResultType, labelsText }}>
            <Container className="p-0">
                <Navmenu />
            </Container>
            <Container className="containerMain">
                <Row>
                    <Col md="12" sm="12">
                        <Router basename='dwquiz'>
                            <Switch>
                                <Route exact path="/" component={Home} />
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