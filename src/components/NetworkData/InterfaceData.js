import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import {Line} from 'react-chartjs-2';


var interfaces = [];
var downstreams = [];
var upstreams = [];

class InterfaceData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			records: 20,
			donwloadData: [0],
			uploadData: [0]
		}
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

					if (this.state.donwloadData.length == this.state.records) {
						this.state.donwloadData.shift();
						this.state.uploadData.shift();
					}

					this.state.donwloadData.push(data.rx_sec / 1024).toFixed(0);
					this.state.uploadData.push(data.tx_sec / 1024).toFixed(0);
					this._chart.chartInstance.update();
				});
			}
		}
	}

	render() {
		var data = {
			labels: [
				"1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", 
				"11s", "12s", "13s", "14s", "15s", "16s", "17s", "18s", "19s", "20s"
			],
			datasets: [
				{
					label: 'Download',
					data: this.state.donwloadData,
					backgroundColor: ['rgba(255, 99, 132, 0.2)'],
					borderColor: ['rgba(255,99,132,1)'],
					borderWidth: 1,
					pointStyle: 'line'
				}, 
				{
					label: 'Upload',
					data: this.state.uploadData,
					backgroundColor: ['rgb(118, 68, 138)'],
					borderColor: ['rgb(175, 122, 197)'],
					borderWidth: 2,
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
				<h3>Current Network Speed</h3>
				<table className="">
					<tbody id="nics"></tbody>
				</table>
				<hr/>
				<div className="">
					<Line ref={(chart)=>{this._chart=chart}} data={data} options={options} />
				</div>
			</div>
		);
	}
}	

export default InterfaceData;