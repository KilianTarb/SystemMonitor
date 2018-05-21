import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import Paper from '@material-ui/core/Paper';

const paperStyle = {
	padding: "10px",
	margin: "10px",
	background: "#272822",
	width: "100%"
};

class InterfaceData extends React.Component {
	constructor(props) {
		super(props);
	}	

	componentDidMount() {
		this.nicInit();
	}

	componentWillUnmount() { }

	nicInit() {
    si.networkInterfaces(function(data) {
      var elements = [];
      for (var i = 0; i < data.length; i++) {
        var element = React.createElement('tr', null, [
          React.createElement('td', null, data[i].iface),
          React.createElement('td', null, data[i].ip4)
        ]);
        elements.push(element);
      }
      ReactDOM.render(elements, document.getElementById('nics'));
    });
  }

	render() {
		return(
			<div className="data">
				<Paper style={paperStyle}>
						<h3>Network Interfaces</h3>
						<table>
							<tbody id="nics"></tbody>
						</table>
				</Paper>
			</div>
		);
	}
}

export default InterfaceData;