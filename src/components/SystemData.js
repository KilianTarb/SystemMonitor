import '../assets/css/App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Google Material-ui
import Paper from '@material-ui/core/Paper';

// Back-end
import os from "os";
import util from "os-utils";
import si from 'systeminformation';

// Components
import MachineData from './SystemData/MachineData';
import StorageData from './SystemData/StorageData';
import ProcessorData from './SystemData/ProcessorData';
import MemoryData from './SystemData/MemoryData';

class SystemData extends React.Component {

  render() {
    return (
      <div>
        <MachineData/>
        <StorageData/>
        <ProcessorData/>
        <MemoryData/>
      </div>
    );
  }
}

export default SystemData;
