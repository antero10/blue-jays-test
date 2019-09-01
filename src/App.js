import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Menu from './components/Menu/';
import Dashboard from './components/Dashboard/';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <Menu/>     
       <Dashboard/>
      </Provider>
    )
  }
}


export default App;
