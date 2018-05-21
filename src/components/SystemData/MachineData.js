import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import Paper from '@material-ui/core/Paper';

const paperStyle = {
    padding: "10px",
    margin: "10px",
    background: "#272822",
    width: "100%"
  };

class MachineData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hostname: os.hostname(),
			platform: os.platform(),
			arch: os.arch(),
			uptime: util.sysUptime()
		}
	}

	componentDidMount() {
		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}
	componentWillUnmount() { 
		clearInterval(this.timerID);
	}
	
	tick() {
		this.setState({
			uptime: util.sysUptime()
		})
	}

	render() {
		return(
			<div className="data">
				<Paper style={paperStyle} zdepth={this.state.paperDepth}>
					<h3>System Data</h3>
					<table>
						<tbody>
							<tr>
								<td>Name:</td>
								<td>{this.state.hostname}</td>
							</tr>
							<tr>
								<td>Platform:</td>
								<td>{this.state.platform}</td>
							</tr>
							<tr>
								<td>Arch:</td>
								<td>{this.state.arch}</td>
							</tr>
							<tr>
								<td>Uptime:</td>
								<td>{this.state.uptime}</td>
							</tr>
						</tbody>
					</table>
				</Paper>
			</div>
		);
	}
}

export default MachineData;