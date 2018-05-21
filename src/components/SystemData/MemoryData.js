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
	}
	componentWillUnmount() {
  }

	memoryBarInit() {
		var bar = new ProgressBar.Circle('#memoryProgress', BarProperties());
	}

	render() {
		return(
			<div className="data">
				<Paper style={paperStyle}>
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
					<h3 className="subtitle">Free Memory</h3>
					<hr/>
					<div className="bar" id="memoryProgress"></div> 
				</Paper>
			</div>
		);
	}
}

export default MemoryData;