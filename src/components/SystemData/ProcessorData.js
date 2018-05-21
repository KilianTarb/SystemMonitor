import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties, BarProperties } from '../../data/ProgresProperties';

const ProgressBar = require('progressbar.js');
const paperStyle = {
	padding: "10px",
	margin: "10px",
	background: "#272822",
	width: "100%"
};
var cores = [];
var cpuStats = {
  overallUsage: 0,
  averageSpeed: 0
};

var cpuBar = null;
var clockBar = null;
class ProcessorData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cpuModel: os.cpus()[0].model,
      cpuUsage: 0,
      cpuAmount: util.cpuCount.call()
		}
	}

	componentDidMount() {
		this.cpuBarInit();
		this.cpuCoreInit();
		this.clockSpeedInit();

		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		this.updateCpuBars();
		this.updateClockSpeed();
	}

	// Renders CPU progress bars
	cpuBarInit() {
		cpuBar = new ProgressBar.Circle("#cpuCoreBars", BarProperties());
	}

	clockSpeedInit() {
		clockBar = new ProgressBar.Circle("#cpuClockBar", BarProperties());
	}
	
	updateCpuBars() {
		util.cpuUsage(function(v) {
			cpuBar.animate(v);
			cpuBar.setText((v*100).toFixed(0)+"%");
		}); 
	}

	updateClockSpeed() {
		si.cpuCurrentspeed(function(data) {
			cpuStats.averageSpeed = data.avg;
			clockBar.animate(data.avg/data.max);
			clockBar.setText(data.avg+"GHz");
		});
	}
	
	cpuCoreInit() {
		var elements = [];
		for (var i = 0; i < 4; i++) {
			var element = React.createElement('div', {className:'cpuCoreDisplay'}, [
				React.createElement('span', {className:'indicator'}, null),
				React.createElement('code', {className:'indicatorData'+i}, 'Core: '+(i+1)),
				React.createElement('br', null, null) 
			]);
			elements.push(element);
		}
		ReactDOM.render(elements, document.getElementById('cores'));
	}

	cpuCoreUpdate() {
		si.cpuTemperature(function(data) {
			for (var i = 0; i < data.cores.length; i++) {        
				document.getElementsByClassName('indicatorData'+i).innerHTML('hhh');
			}
		})
	}

	render() {
		return(
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
							<table>
								<tbody>
									<tr>
									<td><div id="cores"></div></td>
									</tr>
									<tr>
									<td><div className="bar" id="cpuCoreBars"></div></td>
									</tr>
									<tr>
									<td><div className="bar" id="cpuClockBar"></div></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
}

export default ProcessorData;