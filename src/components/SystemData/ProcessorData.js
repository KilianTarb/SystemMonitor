import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties, BarProperties } from '../../data/ProgresProperties';
import Indicator from '../Indicators/Square';

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
var coreTempreatures = [];
class ProcessorData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cpuModel: os.cpus()[0].model,
      cpuUsage: 0,
			cpuAmount: util.cpuCount.call(),
			cpuTemps: []
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
		this.cpuCoreUpdate();
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
		var temps = [];
		// Get inital tempreatures
		si.cpuTemperature().then(data => {
			this.state.cpuTemps = data.cores;
			this.renderIndicators();
		});	
	}

	renderIndicators() {
		// Create elements
		var elements = [];
		for (var i = 0; i < this.state.cpuTemps.length; i++) {
			var element = <Indicator text={this.state.cpuTemps[i]}/>;
			elements.push(element);
		}
		ReactDOM.render(elements, document.getElementById('cores'));
	}

	cpuCoreUpdate() {
		si.cpuTemperature().then(data => {
			this.state.cpuTemps = data.cores;
		});
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