import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserView, MobileView } from 'react-device-detect';
import AppContext from './libs/contextLib';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Navmenu from './NavMenu';
import QuizMain from './QuizMain';
import Home from './Home';
import FooterBlock from './FooterBlock';
import SingleAdUnit from './SingelAdUnit';

import ReactGa from 'react-ga';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const [modalShow, setModalShow] = useState(false);
    let uacodes = {
        'www': 'UA-110466-40',
        'hindi': 'UA-110466-40',
        'tamil': 'UA-110466-40',
        'melugu': 'UA-110466-40',
        'kannada': 'UA-110466-40',
        'malayalam': 'UA-110466-40',
    };
    const [contentLanguage, setContentLanguage] = useState(Object.keys(uacodes)[0]);
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
        if (querystring.get('lang')) {
            quizlang = querystring.get('lang');
            localStorage.setItem('quizlang', quizlang);
        } else {
            if (document.referrer !== '' && document.referrer.split('/')[2] !== document.location.host) {
                quizlang = document.referrer.split('/')[2].split('.')[0]
                quizlang = Object.keys(uacodes).includes(quizlang) ? quizlang : Object.keys(uacodes)[0];
                localStorage.setItem('quizlang', quizlang);
            } else {
                if (localStorage.getItem('quizlang')) {
                    quizlang = localStorage.getItem('quizlang');
                }
            }
        }
        console.log('Referer' + document.referrer);
        console.log(quizlang);
        setContentLanguage(quizlang);
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
        localStorage.setItem('userdata', '');
    }

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, contentLanguage, setContentLanguage, triggerPageView, triggerEvent, modalShow, setModalShow }}>
            <Container className="p-0">
                <Navmenu handleLogout={handleLogout} />
                <MobileView>
                    <SingleAdUnit size="square" />
                </MobileView>
            </Container>
            <Container className="containerMain pb-4" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + '/quiz-video-bg.jpg' + ")", backgroundSize: "cover" }}>
                <Router basename='dwquiz'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/:video_url" children={<QuizMain />} />
                    </Switch>
                </Router>
            </Container>
            <Container className="p-0">
                <FooterBlock />
                <MobileView>
                    <SingleAdUnit size="square" />
                </MobileView>
            </Container>
        </AppContext.Provider>
    );
}