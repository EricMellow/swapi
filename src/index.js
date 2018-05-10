import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

const router = (
  <Router>
    <App />
  </Router>
);


ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
