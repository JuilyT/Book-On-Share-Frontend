import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.scss';
import App from './App';
import Login from './components/login.component';

ReactDOM.render(
    (
        //<Router>
            <Login/>
          //  <App/>
        //</Router>
    ),
    document.querySelector('#root')
)