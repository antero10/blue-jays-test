import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Menu from './components/Menu/';
import Dashboard from './components/Dashboard/';
import DashordPlayer from './components/DashboardPlayer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from './history';

import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} forceRefresh={true}>
          
            <Menu/>
            <Route exact path="/team/:id" render={() => <Dashboard />} />
            <Route exact path="/player/:id" render={() => <DashordPlayer />} />
        </Router>
      </Provider>
    )
  }
}


export default App;
