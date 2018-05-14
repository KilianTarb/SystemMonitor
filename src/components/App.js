import '../assets/css/App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import SystemData from './SystemData';
import NetworkData from './NetworkData';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="dataSection">
            <h2>System</h2>
            <SystemData/>
          </div>
          <div className="dataSection">
            <h2>Network</h2>
            <NetworkData/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
