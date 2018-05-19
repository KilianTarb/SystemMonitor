import '../assets/css/App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Google Material-ui
import Paper from '@material-ui/core/Paper';

// Back-end
import os from "os";
import util from "os-utils";
import cpuData, { getCPUdata, getCpuStats, GetPercentage } from '../lib/CpuData';


const ProgressBar = require('progressbar.js');
const BarProperties = {
  strokeWidth: 6,
  easing: 'easeInOut',
  duration: 1400,
  color: '#A6E22E',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null,
}

const paperStyle = {
  padding: "10px",
  margin: "10px",
  background: "#272822",
  width: "100%"
};
const barStyle = {
};

var cpuCores = [];

class SystemData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Data
      hostname: os.hostname.call(),
      platform: os.platform.call(),
      uptime: util.sysUptime.call(), 
      totalStorage: 0,
      freeStorage: 0,
      cpuModel: os.cpus()[0].model,
      cpuUsage: 0,
      cpuAmount: util.cpuCount.call(),
      totalMemory: util.totalmem.call(),
      freemem: util.freemem.call(),
      freememPer: util.freememPercentage.call(),

      // Components
      paperDepth: 1
    }

    // Binding
    
    
  }


  componentDidMount() {
    // Mount the progress bars
    var memoryBar = new ProgressBar.Circle("#memoryProgress", BarProperties);
    
    this.cpuBarInit.call();

    this.timerID = setInterval(
      () => this.tick(memoryBar),
      1000
    );
  }

  componentWillUnmount() {

  }
  
  // Renders CPU progress bars
  cpuBarInit() {
    var cpu = os.cpus();
    for (var i = 0; i < 1; i++) {
      var props = {className: 'cpuCore'+i};
      var barElement = React.createElement('div', props, null);
      var bar = new ProgressBar.Circle("#cpuCoreBars", BarProperties);
      cpuCores.push(bar);
    }
  }

  updateCpuBars() {
    util.cpuUsage(function(v) {
      // Will soon add a bar foreach core in the CPU
      for (var i = 0; i < cpuCores.length; i++) {
        console.log("Updating Bar "+i);
        cpuCores[i].animate(v);
        cpuCores[i].setText((v*100).toFixed(0)+"%");
      }
    }); 
  }

  tick(memBar) {
    // Values that need updating
    this.setState({
      uptime: util.sysUptime.call(), 
      freeStorage: 0,
      cpuUsage: 0,
      freemem: util.freemem.call(),
      freememPer: util.freememPercentage.call()
    });

    // Update Memory Bars
    memBar.animate(this.state.freememPer);
    memBar.setText(((this.state.freememPer)*100).toFixed(0)+'%');

    // Update CPU Bars
    this.updateCpuBars(this);
  }


  render() {
    return (
      <div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>System Data</h3>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <h3>Storage</h3>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <div>
              <h3>CPU</h3>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>Model:</td>
                      <td>{this.state.cpuModel}</td>
                    </tr>
                    <tr>
                      <td>Cores:</td>
                      <td>{this.state.cpuAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="subtitle">Usage</h3>
              <hr/>
              <div>
                <dir style={barStyle} className="bar" id="cpuCoreBars"></dir>
              </div>
            </div>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle} zdepth={this.state.paperDepth}>
            <div>
              <h3>Memory</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Total:</td>
                    <td>{this.state.totalMemory.toFixed(0)+" MB"}</td>
                  </tr>
                  <tr>
                    <td>Free:</td>
                    <td>{this.state.freemem.toFixed(0)+" MB"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="subtitle">Usage</h3>
            <hr/>
            <div style={barStyle} className="bar" id="memoryProgress"></div> 
          </Paper>
        </div>
      </div>
    );
  }
}

export default SystemData;
