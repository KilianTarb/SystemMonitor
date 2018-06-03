import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties, SemiProperties } from '../../data/ProgresProperties';
import {Line} from 'react-chartjs-2';

const ProgressBar = require('progressbar.js');


var pingBar = null;
var pingCode = '';
var pingRtt = [];

class PingData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
      pingUrl: 'http://www.google.com',
			currentPingCode: '',
			rttData: []
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
    si.inetChecksite(this.state.pingUrl).then(data => { 
      pingBar.animate(data.ms/2000);
      pingBar.setText(data.ms);
			pingCode = data.status;
			if (pingRtt.length > 20) {
				pingRtt.shift();
			} 
			pingRtt.push(data.ms);
			this._chart.chartInstance.update();
		});
		this._chart.chartInstance.update();
  }

	render() {
		var data = {
			labels: [
				"1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", 
				"11s", "12s", "13s", "14s", "15s", "16s", "17s", "18s", "19s", "20s"
			],
			datasets: [
				{
					label: 'RTT',
					data: pingRtt,
					backgroundColor: ['rgba(255, 99, 132, 0.2)'],
					borderColor: ['rgba(255,99,132,1)'],
					borderWidth: 1,
					pointStyle: 'line'
				}
			],				
		}

		var options = {
			maintainAspectRatio: false,
			responsive: true
		}

		return(
			<div className="data">
				<h3>Current Round Trip Time</h3>
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
				<div id="pingBar" className="barInline sideData"></div>
				<div className="sideChart">
					<Line ref={(chart)=>{this._chart=chart}} data={data} options={options} />
				</div>
			</div>
		);
	}
}

export default PingData;