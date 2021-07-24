import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import AppContext from './libs/contextLib';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Navmenu from './NavMenu';
import QuizMain from './QuizMain';
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
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

    const Home = () => {
        return (
            <>
                <Container>
                    <div className='row bg-light p-5 my-5 rounded'>
                        <div className='col-md-12 text-center'>
                            {isAuthenticated ? (
                                <p>Welcome {userData.name} </p>
                            ) : (
                                    <>Please Login</>
                                )}
                        </div>
                    </div>
                </Container>
            </>
        );
    }

    const NotFound = () => {
        return (
            <Route render={({ staticContext }) => {
                if (staticContext) {
                    staticContext.status = 404;
                }
                return (
                    <div>
                        <h1>404 : Not Found</h1>
                    </div>
                )
            }} />
        );
    };

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
            <Navmenu handleLogout={handleLogout} />
            <Container className="containerMain">
                <Router basename='dwquiz'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route path="/dw-video/:video_url" children={<QuizMain />} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Container>
        </AppContext.Provider>
    );
}