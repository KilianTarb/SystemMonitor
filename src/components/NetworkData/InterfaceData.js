import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';


var interfaces = [];
var downstreams = [];
var upstreams = [];

class InterfaceData extends React.Component {
	constructor(props) {
		super(props);
	}	

	componentDidMount() {
		this.nicInit();
		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
	}

	componentWillUnmount() { }

	nicInit() {
    si.networkInterfaces(function(data) {
			interfaces = data;
      var elements = [];
      for (var i = 0; i < data.length; i++) {
				// Setup the Up/Down arrays
				upstreams.push(i);
				downstreams.push(i);

        var element = React.createElement('tr', null, [
          React.createElement('td', null, data[i].iface),
					React.createElement('td', null, data[i].ip4),
					React.createElement('td', {id: 'nicDown'+i}, 0),
					React.createElement('td', {id: 'nicUp'+i}, 0)
        ]);
        elements.push(element);
      }
			ReactDOM.render(elements, document.getElementById('nics'));
    });
	}
	
	tick() {
		for (var i = 0; i < interfaces.length; i++) {
			if (!interfaces[i].internal) {
				var downId = 'nicDown'+i;
				var upId = 'nicUp'+i;
				si.networkStats(interfaces[i].iface).then(data => {
					document.getElementById(downId).innerHTML = (data.rx_sec / 1024).toFixed(0) + " KB/ps Down";
					document.getElementById(upId).innerHTML = (data.tx_sec / 1024).toFixed(0) + " KB/ps Up";
					console.log(data);
				})
			}
		}
	}

	render() {
		return(
			<div className="data">
				<h3>Network Interfaces</h3>
				<table>
					<tbody id="nics"></tbody>
				</table>
			</div>
		);
	}
}

export default InterfaceData;