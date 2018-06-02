import '../assets/css/App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import SystemData from './SystemData';
import NetworkData from './NetworkData';

import Interface from './NetworkData/InterfaceData';
import Ping from './NetworkData/PingData';
import Machine from './SystemData/MachineData';
import Memory from './SystemData/MemoryData';
import Processor from './SystemData/ProcessorData';
import Storage from './SystemData/StorageData';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="debug">1</div>
        <div className="debug">2</div>
        <Ping/>
        <Interface/>
        <Storage/>
        <Machine/>
        <Memory/>
        <Processor/>
      </div>
    );
  }
}

export default App;
