import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

ReactDOM.render(<App />, rootElement);
