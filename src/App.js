import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Menu from './components/Menu/';
import Dashboard from './components/Dashboard/';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from './history';

import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} forceRefresh={true}>
          
            <Menu/>
            <Route path="/team/:id" render={() => <Dashboard />} />
        </Router>
      </Provider>
    )
  }
}


export default App;
