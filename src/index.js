import React from 'react';
import ReactDOM from 'react-dom';
import './quiz.css';
import App from './App';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
