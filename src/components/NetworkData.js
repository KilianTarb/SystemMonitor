import '../assets/css/App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Google Material-ui
import Paper from '@material-ui/core/Paper';

// Back-end
import os from "os";
import util from "os-utils";
import si from 'systeminformation';


const paperStyle = {
  padding: "10px",
  margin: "10px",
  background: "#272822",
  width: "100%"
};


const ProgressBar = require('progressbar.js');
var pingBar = null;
var pingCode = '';
class NetworkData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pingUrl: 'http://www.google.com',
      currentPingCode: ''
    }    
  }


  componentDidMount() {
    pingBar = new ProgressBar.SemiCircle('#pingBar', {
      strokeWidth: 6,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      from: {color: '#A6E22E'},
      to: {color: '#ED6A5A'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        var value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(value+"ms");
        }
    
        bar.text.style.color = state.color;
      }
    });

    console.log('Mounted');
    this.nicInit.call();

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {

  }

  nicInit() {
    si.networkInterfaces(function(data) {
      var elements = [];
      for (var i = 0; i < data.length; i++) {
        var element = React.createElement('tr', null, [
          React.createElement('td', null, data[i].iface),
          React.createElement('td', null, data[i].ip4)
        ]);
        elements.push(element);
      }
      ReactDOM.render(elements, document.getElementById('nics'));
    });
  }

  ping() {
    si.inetChecksite(this.state.pingUrl, function(data) {
      pingBar.animate(data.ms/1000);
      pingBar.setText(data.ms);
      pingCode = data.status;
    });
  }

  tick() {
    this.ping();
    this.setState({
      currentPingCode: pingCode
    });
  }

  render() {
    return (
      <div>
        <div className="data">
          <Paper style={paperStyle}>
            <h3>Network Interfaces</h3>
            <table>
              <tbody id="nics">

              </tbody>
            </table>
          </Paper>
        </div>
        <div className="data">
          <Paper style={paperStyle}>
            <h3>Speed</h3>
            <table>
              <tbody>
                <tr>
                  <td>Host:</td>
                  <td>{this.state.pingUrl}</td>
                </tr>
                <tr>
                  <td>Status Code:</td>
                  <td>{this.state.currentPingCode}</td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <div id="pingBar" className="bar">
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default NetworkData;
