import React from 'react';
import { Route } from 'react-router-dom';
const NotFound = () => {
    return (
        <Route render={({ staticContext }) => {
            if (staticContext) {
                staticContext.status = 404;
            }
            return (
                <div className="d-flex align-items-center justify-content-center text-white flex-column">
                    <h1>404 : Not Found</h1>
                    <span>Go <a href={process.env.REACT_APP_API_BASEPATH}>HOME</a></span>
                </div>
            )
        }} />
    );
};

export default NotFound;