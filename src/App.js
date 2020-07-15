import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/layout/Navbar';

import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
