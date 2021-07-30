import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserView, MobileView } from 'react-device-detect';
import AppContext from './libs/contextLib';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Navmenu from './NavMenu';
import QuizMain from './QuizMain';
import Home from './Home';
import ReactGa from 'react-ga';
import SingleAdUnit from './SingelAdUnit';
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const [contentLanguage, setContentLanguage] = useState('English');
    const triggerPageView = () => {
        // ReactGa.initialize('UA-110466-52');
        // ReactGa.pageview(window.location.href);
    }
    useEffect(function () {
        triggerPageView();
    }, []);

    useEffect(() => {
        let querystring = new URLSearchParams(window.location.search);
        if (querystring.get('lang')) {
            setContentLanguage(querystring.get('lang'));
        }
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
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, contentLanguage, setContentLanguage, triggerPageView }}>
            <Container className="p-0">
                <Navmenu handleLogout={handleLogout} />
                <BrowserView>
                    <SingleAdUnit size="banner" />
                </BrowserView>
                <MobileView>
                    <SingleAdUnit size="square" />
                </MobileView>
            </Container>
            <Container className="containerMain  mb-4 pb-4" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + '/quiz-video-bg.jpg' + ")", backgroundSize: "cover" }}>
                <Router basename='dwquiz'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route path="/:video_url" children={<QuizMain />} />
                    </Switch>
                </Router>
            </Container>
            <Container>
                <BrowserView>
                    <SingleAdUnit size="banner" />
                </BrowserView>
                <MobileView>
                    <SingleAdUnit size="square" />
                </MobileView>
            </Container>
        </AppContext.Provider>
    );
}