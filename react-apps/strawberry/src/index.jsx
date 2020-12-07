import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
