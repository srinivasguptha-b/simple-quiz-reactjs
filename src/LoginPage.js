import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import AppContext from './libs/contextLib';

const LoginPage = () => {
    const { isAuthenticated, setIsAuthenticated, setUserData } = useContext(AppContext);
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
            {isAuthenticated ? <Redirect to="" /> : <GoogleLogin
                clientId={process.env.REACT_APP_API_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />}
        </>

    );
}

export default LoginPage;