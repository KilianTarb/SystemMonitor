import '../../assets/css/App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const process = require('process');

class DebugStatusBar extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      cpuUasge: 0,
      memoryUsage: 0
    };
  }

  componentDidMount() {
		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}

	componentWillUnmount() { }

	tick() {
		this.setState({
      cpuUasge: process.getCPUUsage().percentCPUUsage.toFixed(0),
      memoryUsage: (process.getProcessMemoryInfo().workingSetSize/1024).toFixed(0)
    });
	}

  render() {
    return (
      <div className="footer">
          <p className="">CPU: {this.state.cpuUasge}% ____ </p>
          <p className="">Memory: {this.state.memoryUsage}KB</p>
      </div>
    );
  }
}

export default DebugStatusBar;
