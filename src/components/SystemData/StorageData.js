import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';
import ProgressProperties, { LineProperties } from '../../data/ProgresProperties';

const ProgressBar = require('progressbar.js');
const paperStyle = {
	padding: "10px",
	margin: "10px",
	background: "#272822",
	width: "100%"
};

class StorageData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hostname: os.hostname.call(),
			platform: os.platform.call(),
			arch: os.arch.call(),
			uptime: util.sysUptime.call()
		}
	}

	componentDidMount() {
		this.storageBarInit();
	}
	componentWillUnmount() {

  }

	storageBarInit() {
    si.fsSize(function(data) {
      var elements = [];
      for (var i = 0; i < data.length; i++) {
        var TotalMegabytes = (data[i].size/1048576).toFixed(0) + " MB";
        var UsedMegabytes = (data[i].used/1048576).toFixed(0) + " MB";

        var elementID = "storage"+i;
        var element = React.createElement('div', {id:elementID, className:"storageBar"}, [
          React.createElement('span', null, data[i].fs),
          React.createElement('code', {className:'right'}, data[i].type),
          React.createElement('br', null, null),
          React.createElement('code', null, (TotalMegabytes + " / " + UsedMegabytes))
        ]);
        elements.push(element);  
      }

      ReactDOM.render(elements, document.getElementById('storageProgress'));

      for (var i = 0; i < data.length; i++) {
        var bar = new ProgressBar.Line('#storage'+i, LineProperties());
        bar.animate(data[i].use / 100);
        bar.setText(data[i].use.toFixed(1)+"%");
      }
    });
  }

	render() {
		return(
			<div className="data">
				<Paper style={paperStyle}>
					<h3>Storage</h3>
					<div id="storageProgress"></div> 
				</Paper>
			</div>
		);
	}
}

export default StorageData;