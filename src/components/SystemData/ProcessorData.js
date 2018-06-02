import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties, BarProperties, SemiProperties } from '../../data/ProgresProperties';
import Indicator from '../Indicators/Square';
import {Line} from 'react-chartjs-2';


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
var tempIndicators = [];

var chartSets = [];

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
		this.generateDatasets();

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
		this.updateChart();
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
		// Get inital tempreatures
		si.cpuTemperature().then(data => {
			this.state.cpuTemps = data.cores;
			this.renderIndicators();
		});	
	}

	renderIndicators() {
		var divs = [];
		for (var i = 0; i < this.state.cpuTemps.length; i++) {
			var divId = "core"+i;
			var div = React.createElement('div', {id: divId, className: "bar"}, null);
			divs.push(div);
		}

		ReactDOM.render(divs, document.getElementById('cores'));

		for (var i = 0; i < this.state.cpuTemps.length; i++) {
			// Create Bar
			var tempBar = new ProgressBar.SemiCircle('#core'+i, LineProperties());
			tempBar.animate(this.state.cpuTemps[i] / 1000);
			tempBar.setText(this.state.cpuTemps[i]);
			tempIndicators.push(tempBar);
		}
	}

	cpuCoreUpdate() {
		si.cpuTemperature().then(data => {
			this.state.cpuTemps = data.cores;
			for (var i = 0; i < tempIndicators.length; i++) {
				tempIndicators[i].animate(this.state.cpuAmount[i]/1000);
				tempIndicators[i].setText(this.state.cpuTemps[i]);
			}
		});
	}

	generateDatasets() {
		var sets = [];
		// Get the CPU loads
		si.currentLoad().then(data => {
			for (var i = 0; i < data.cpus.length; i++) {
				var newSet = {
					label: "CPU"+(i+1),
					data: [],
					backgroundColor: ['rgba(255, 99, 132, 0.2)'],
					borderColor: ['rgba(255,99,132,1)'],
					borderWidth: 1,
					pointStyle: 'line'
				}
				chartSets.push(newSet);
			}
		});
		this._chart.chartInstance.update();
		console.log("Datasets Generated");
		console.log(chartSets);
	}

	updateChart() {
		si.currentLoad().then(data => {
			for (var i = 0; i < data.cpus.length; i++) {
				if (chartSets[0].data.length == 21) {
					chartSets[i].data.shift();
				}
				chartSets[i].data.push(data.cpus[i].load);
				this._chart.chartInstance.update();
			}
		});
	}

	render() {
		
		var data = {
			labels: [
				"1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", 
				"11s", "12s", "13s", "14s", "15s", "16s", "17s", "18s", "19s", "20s"
			],
			datasets: chartSets,				
		}

		var options = {
			maintainAspectRatio: false,
			responsive: true
		}

		return(
			<div className="data">
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
					<div className="row">
						<div className="barInline" id="cpuCoreBars"></div>
						<div className="barInline" id="cpuClockBar"></div>
					</div>
				</div>
				<div>
				<Line ref={(chart)=>{this._chart=chart}} data={data} options={options} />
				</div>
			</div>
		);
	}
}

export default ProcessorData;