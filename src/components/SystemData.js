import '../assets/css/App.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import os from "os";
import util from "os-utils";


const paperStyle = {
  padding: "10px"
};


class SystemData extends React.Component {
  constructor(props) {
    super(props);
  
    util.cpuUsage(function(value) {
      console.log("Usage: "+value);
    });

    this.state = {
      // Data
      hostname: os.hostname.call(),
      platform: os.platform.call(),
      uptime: util.sysUptime.call(), 
      totalStorage: 0,
      freeStorage: 0,
      cpuUsage: this.getCpuUsage(),
      cpuAmount: util.cpuCount.call(),
      totalMemory: util.totalmem.call(),
      freemem: util.freemem.call(),
      freememPer: util.freememPercentage.call(),

      // Components
      paperDepth: 1
    }
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {

  }

  tick() {
    // Value that need updating
    this.setState({
      uptime: util.sysUptime.call(), 
      freeStorage: 0,
      cpuUsage: this.getCpuUsage(),
      freemem: util.freemem.call(),
      freememPer: util.freememPercentage.call()
    });

    console.log('Tick');
  }

  getCpuUsage() {
    var usage;
    util.cpuUsage(function(value) {
      usage = value;
    });
    return usage;
  }

  render() {
    return (
      <div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>System Data</h3>
            <span>Name: {this.state.hostname}</span><br/>
            <span>Platform: {this.state.platform}</span><br/>
            <span>Uptime: {this.state.uptime}</span>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>Storage</h3>
            <span>Total: {this.state.totalStorage}</span><br/>
            <span>Free: {this.state.freeStorage}</span>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>CPU</h3>
            <span>Cores: {this.state.cpuAmount}</span><br/>
            <span>Usage: {this.state.cpuUsage}</span>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>Memory</h3>
            <span>Total: {this.state.totalMemory.toFixed(0)+"MB"}</span><br/>
            <span>Free: {this.state.freemem.toFixed(0)+"MB ("+(this.state.freememPer*100).toFixed(0)+"%)"}</span>
          </Paper>
        </div>
      </div>
    );
  }
}

export default SystemData;
