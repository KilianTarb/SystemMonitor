import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties, SemiProperties } from '../../data/ProgresProperties';

const ProgressBar = require('progressbar.js');
const paperStyle = {
	padding: "10px",
	margin: "10px",
	background: "#272822",
	width: "100%"
};

var pingBar = null;
var pingCode = '';

class PingData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      pingUrl: 'http://www.google.com',
      currentPingCode: ''
    }   
	}	

	componentDidMount() {
		this.pingInit();
		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}

	componentWillUnmount() { }

	tick() {
		this.ping();
	}

	pingInit() {
		pingBar = new ProgressBar.SemiCircle('#pingBar', SemiProperties());
	}

	ping() {
    si.inetChecksite(this.state.pingUrl, function(data) {
      pingBar.animate(data.ms/2000);
      pingBar.setText(data.ms);
      pingCode = data.status;
    });
  }

	render() {
		return(
			<div className="data">
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
			</div>
		);
	}
}

export default PingData;