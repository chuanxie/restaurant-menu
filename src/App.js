import React, { Component } from 'react';
import logo from './images/logo.svg';
import './App.css';

import Menu from './components/Menu'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Golden Cod Doncaster</h2>
        </div>
        <Menu />
      </div>
    );
  }
}

export default App;
