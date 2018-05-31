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

var bar = null;
class MemoryData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalMemory: os.totalmem()/1e+6,
			freemem: os.freemem()/1e+6
		}
	}

	componentDidMount() {
		this.memoryBarInit();

		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		this.updateTotalUsage();
	}


	memoryBarInit() {
		bar = new ProgressBar.Circle('#memoryProgress', BarProperties());
	}

	updateTotalUsage() {
		var usage = util.totalmem() - util.freemem();
		var perc = ((usage / util.totalmem())*100);
		bar.setText((perc.toFixed(0))+"%");
		bar.animate(perc/100);
	}

	render() {
		return(
			<div className="data">
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
				<div className="bar" id="memoryProgress"></div> 
			</div>
		);
	}
}

export default MemoryData;