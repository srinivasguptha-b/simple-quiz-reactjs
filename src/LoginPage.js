import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import AppContext from './libs/contextLib';

const LoginPage = () => {
    const { isAuthenticated, setIsAuthenticated, setUserData, userData, contentLanguage } = useContext(AppContext);
    let history = useHistory();
    useEffect(function () {
        if (isAuthenticated) {
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
                        let ulx = (contentLanguage == 'www') ? "" : "?lang=" + contentLanguage;
                        history.push(`${process.env.REACT_APP_API_BASEPATH}` + d.data.activeQuiz + ulx);
                    }
                });
        }
    }, [isAuthenticated]);
    const handleLogin = async googleData => {

        const res = await fetch(`${process.env.REACT_APP_API_URL_AUTH}/g-auth.php`, {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const Logindata = await res.json();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ func: 'register_login_user', data: Logindata })
        };
        fetch(`${process.env.REACT_APP_API_URL_POST}`, requestOptions).then(response => response.json())
            .then(data => {
                localStorage.setItem('userdata', JSON.stringify(data.data));
                setUserData(data.data);
                setIsAuthenticated(true);
            });
        // store returned user somehow
    }

    return (
        <>
            {isAuthenticated ? <></> :
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <GoogleLogin
                        className="btn-google d-flex justify-content-center"
                        clientId={process.env.REACT_APP_API_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            }
        </>

    );
}

export default LoginPage;