import '../assets/css/App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';

import Interface from './NetworkData/InterfaceData';
import Ping from './NetworkData/PingData';
import Machine from './SystemData/MachineData';
import Memory from './SystemData/MemoryData';
import Processor from './SystemData/ProcessorData';
import Storage from './SystemData/StorageData';

import Footer from './Window/DebugStatusBar';

class App extends React.Component {
  render() {
    return (
      <div>
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
        <Footer/>
      </div>
    );
  }
}

export default App;
